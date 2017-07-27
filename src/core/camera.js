import { DynamicValue, ShaderUniforms } from './gl'
import { Object3D } from './object3d'

import computeEyeVector from 'eye-vector'
import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export class Camera extends Object3D {
  static defaults() {
    return {
      ...super.defaults(),
      projection: kMat4Identity,
      direction: [0, 0, -1],
      target: [0, 0, 0],
      near: 0.01,
      view: kMat4Identity,
      far: 1000,
      up: [0, 1, 0],
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Camera.defaults(), initialState)
    const {update} = initialState
    const context = new CameraContext(ctx, initialState)
    const uniforms = new CameraUniforms(ctx, initialState)
    const injectContext = ctx.regl({ context, uniforms })

    super(ctx, {
      ...initialState,
      update(state, block) {
        if ('function' == typeof update) {
          update(state, () => {
            injectContext(state, block)
          })
        } else {
          injectContext(state, block)
        }
      }
    })
  }
}

export class CameraContext extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, Camera.defaults(), initialState)
    const get = (k, objs) => (objs.filter((o) => o).find((o) => o[k]) || {})[k]
    super(ctx, initialState, {
      matrix() { return kMat4Identity },

      invertedView({view}) {
        return view ? mat4.invert([], view) : kMat4Identity
      },

      projection({controller}, args) {
        return get('projection', [controller, args, initialState])
      },

      direction({controller}, args) {
        return get('direction', [controller, args, initialState])
      },

      aspect(ctx, args) {
        const width = get('viewportWidth', [args, ctx])
        const height = get('viewportHeight', [args, ctx])
        return width/height
      },

      target(ctx, args) {
        const scale = get('scale', [ctx, args, initialState])
        const target  = get('target', [args, initialState, ctx])
        return vec3.multiply([], target, scale)
      },

      near({controller}, args) {
        return get('near', [controller, args, initialState])
      },

      far({controller}, args) {
        return get('far', [controller, args, initialState])
      },

      eye(ctx, args) {
        const view = get('view', [ctx, args]) || kMat4Identity
        return computeEyeVector(view)
      },

      up({controller}, args) {
        return get('up', [controller, args, initialState])
      },

      createPickingRay({controller, viewportHeight: h}) {
        let mx = 0, my = 0
        return ({x, y}) => {
          mx = x
          my = h - y
          return controller.createPickingRay([mx, my])
        }
      },

      view(ctx, args) {
        const matrix = mat4.identity([])
        const controller = get('controller', [args, ctx, initialState])
        const position = get('position', [args, ctx, initialState])
        const rotation = get('rotation', [args, ctx, initialState])
        const target = get('target', [args, ctx, initialState])
        const scale = get('scale', [args, ctx, initialState])

        if (!controller || !position || !rotation || !target || !scale) {
          return kMat4Identity
        }

        controller.identity()
        controller.translate(position)
        controller.lookAt(vec3.multiply([], target, scale))
        controller.update()

        quat.normalize(scratchQuaternion, rotation)
        mat4.fromQuat(scratchMatrix, scratchQuaternion)
        mat4.copy(matrix, controller.view)
        mat4.multiply(matrix, matrix, scratchMatrix)
        return matrix
      },

      viewport(ctx, args) {
        const controller = get('controller', [args, ctx, initialState])
        const viewport = get('viewport', [args, ctx, initialState])
        const height = get('viewportHeight', [args, ctx, initialState])
        const width = get('viewportWidth', [args, ctx, initialState])
        const left = get('viewportLeft', [args, ctx, initialState])
        const top = get('viewportTop', [args, ctx, initialState])
        if (controller) {
          return Object.assign(controller.viewport, viewport || [
            (left || 0), (top || 0), (width || 0), (height || 0)
          ])
        }
        return viewport
      },
    })
  }
}

export class CameraUniforms extends ShaderUniforms {
  constructor(ctx) {
    super(ctx)
    this.set({
      'camera.invertedView': ({invertedView}) => invertedView,
      'camera.projection': ({projection}) => projection,
      'camera.aspect': ({aspect}) => aspect,
      'camera.view': ({view}) => view,
      'camera.eye': ({eye}) => [...eye],
    })
  }
}
