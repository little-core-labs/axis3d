import { ContextComponent } from './components/context'
import { Component } from './component'
import { get } from '../utils'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class Object3D extends Component {
  static defaults() {
    return {
      ...super.defaults(),
      rotation: [0, 0, 0, 1],
      position: [0, 0, 0],
      scale: [1, 1, 1]
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Object3D.defaults(), initialState)
    super(ctx, initialState,
      new Object3DContext(ctx, initialState),
      new Object3DMatrixContext(ctx, initialState),
      new Object3DTransformContext(ctx, initialState))
  }
}

export class Object3DContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Object3D.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      scale(ctx, args) {
        const scale = get('scale', [args, initialState, ctx])
        if ('number' == typeof scale) { return [scale, scale, scale] }
        return scale
      },

      position(ctx, args) {
        return get('position', [args, initialState, ctx])
      },

      rotation(ctx, args = {}) {
        return get('rotation', [args, initialState, ctx])
      },
    }))
  }
}

export class Object3DMatrixContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Object3D.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      matrix(ctx, args) {
        const matrix = mat4.identity([])
        const position = get('position', [ctx, args, initialState])
        const rotation = get('rotation', [ctx, args, initialState])
        const scale = get('scale', [ctx, args, initialState])
        // M = T * R * S
        mat4.fromRotationTranslation(matrix, rotation, position)
        mat4.scale(matrix, matrix, scale)
        return matrix
      }
    }))
  }
}

export class Object3DTransformContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Object3D.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      transform(ctx, args) {
        const {matrix: local, transform: parent} = ctx
        const matrix = mat4.identity([])
        const {transform} = (args || {})
        // M' = Mp * M
        if (parent) { mat4.multiply(matrix, parent, local) }
        // apply external transform from arguments to computed transform
        if (transform) { mat4.multiply(matrix, transform, matrix) }
        return matrix
      },
    }))
  }
}
