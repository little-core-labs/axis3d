import { DynamicValue } from './gl'
import { Entity } from './entity'
import coalesce from 'defined'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class Object3D extends Entity {
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
    const context = new Object3DContext(ctx, initialState)
    const injectContext = ctx.regl({context})
    super(ctx, initialState, (state, block) => {
      injectContext(state, (...args) => {
        const {update} = initialState
        if ('function' == typeof update) {
          update(state, block)
        } else if ('function' == typeof block) {
          block(...args)
        }
      })
    })
  }
}

export class Object3DContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    const defaults = Object3D.defaults()
    const get = (k, objs) => (objs.filter((o)=> o).find((o) => o[k]) || {})[k]
    Object.assign(initialState, defaults, initialState)
    super(ctx, initialState, {
      scale(ctx, args) {
        const scale = get('scale', [args, ctx, initialState, defaults])
        if ('number' == typeof scale) { return [scale, scale, scale] }
        return scale
      },

      position(ctx, args) {
        return get('position', [args, ctx, initialState, defaults])
      },

      rotation(ctx, args = {}) {
        return get('rotation', [args, ctx, initialState, defaults])
      },

      matrix(ctx, args) {
        const matrix = mat4.identity([])
        const position = get('position', [args, ctx, initialState, defaults])
        const rotation = get('rotation', [args, ctx, initialState, defaults])
        const scale = get('scale', [args, ctx, initialState, defaults])
        // M = T * R * S
        mat4.fromRotationTranslation(matrix, rotation, position)
        mat4.scale(matrix, matrix, scale)
        return matrix
      },

      transform(ctx, args) {
        const {matrix: local, transform: parent} = ctx
        const {transform} = (args || {})
        const matrix = mat4.identity([])
        // M' = Mp * M
        if (parent) { mat4.multiply(matrix, parent, local) }
        // apply external transform from arguments to computed transform
        if (transform) { mat4.multiply(matrix, transform, matrix) }
        return matrix
      },
    })
  }
}
