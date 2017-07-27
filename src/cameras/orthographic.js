import createBaseCameraController from 'orthographic-camera'
import { DynamicValue } from '../core/gl'
import { Camera } from '../core/camera'

export class OrthographicCamera extends Camera {
  static defaults() {
    return { ...super.defaults() }
  }

  constructor(ctx, initialState) {
    Object.assign(initialState, OrthographicCamera.defaults(), initialState)
    const context = new OrthographicCameraContext(ctx, initialState)
    const injectContext = ctx.regl({context})
    super(ctx, {
      ...initialState,
      update(state, block) {
        injectContext(state, block)
      }
    })
  }
}

export class OrthographicCameraContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, OrthographicCamera.defaults(), initialState)
    const controller = createBaseCameraController(initialState)
    const get = (k, objs) => (objs.filter((o)=> o).find((o) => o[k]) || {})[k]
    super(ctx, initialState, {
      viewport(ctx, args) {
        const controller = get('controller', [args, ctx, initialState])
        const viewport = get('viewport', [args, ctx, initialState])
        const height = get('viewportHeight', [args, ctx, initialState])
        const width = get('viewportWidth', [args, ctx, initialState])
        if (controller) {
          return Object.assign(controller.viewport, viewport || [
            -width, -height, width, height,
          ])
        }
        return viewport
      }
    })
  }
}
