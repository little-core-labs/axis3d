import createBaseCameraController from 'perspective-camera'
import { DynamicValue } from '../core/gl'
import { radians } from '../utils'
import { Camera } from '../core/camera'

export class PerspectiveCamera extends Camera {
  static defualts() {
    return { ...super.defaults(), fov: radians(60) }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, PerspectiveCamera.defaults(), initialState)
    const context = new PerspectiveCameraContext(ctx, initialState)
    const injectContext = ctx.regl({context})
    super(ctx, {
      ...initialState,
      update(state, block) {
        injectContext(state, block)
      }
    })
  }
}

export class PerspectiveCameraContext extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, PerspectiveCamera.defaults(), initialState)
    const controller = createBaseCameraController(initialState)
    const get = (k, objs) => (objs.filter((o)=> o).find((o) => o[k]) || {})[k]
    super(ctx, initialState, {
      fov({controller}, args) {
        return get('fov', [controller, args, initialState])
      },

      controller(ctx, args) {
        const near = get('near', [args, ctx, initialState])
        const far = get('far', [args, ctx, initialState])
        const fov = get('fov', [args, ctx, initialState])
        let needsUpdate = false
        if (far && controller.far != far) {
          controller.far = far
          needsUpdate = true
        }

        if (near && controller.near != near) {
          controller.near = near
          needsUpdate = true
        }

        if (fov && controller.fov != fov) {
          controller.fov = fov
          needsUpdate = true
        }

        if (needsUpdate) { controller.update() }
        return controller
      },
    })
  }
}
