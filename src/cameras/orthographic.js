import { PerspectiveCamera } from './perspective'
import { ContextComponent } from'../core/components/context'
import { CameraUniforms } from '../core/camera'
import { Component } from '../core/component'
import mat4 from 'gl-mat4'

const scratchMatrix = mat4.identity([])

export class OrthographicCamera extends Component {
  static defaults() {
    return {
      ...super.defaults(),
      ...PerspectiveCamera.defaults(),
      near: 100,
      far: 1,
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, OrthographicCamera.defaults(), initialState)
    super(ctx, initialState, Component.compose(ctx, [
      new PerspectiveCamera(ctx, initialState),
      new OrthographicCameraContext(ctx, initialState),
      new CameraUniforms(ctx, initialState),
    ]))
  }
}

export class OrthographicCameraContext extends Component {
  constructor(ctx, initialState) {
    Object.assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      projection() {
        const projection = mat4.identity(scratchMatrix)
        const viewport = get('viewport', [args, ctx, initialState])
        const near = get('near', [args, ctx, initialState])
        const far = get('far', [args, ctx, initialState])
        const left = viewport[0]
        const bottom = viewport[1]
        const right = viewport[2]
        const top = viewport[3]
        mat4.ortho(projection, left, right, bottom, top, near, far)
        return projection
      }
    }))
  }
}
