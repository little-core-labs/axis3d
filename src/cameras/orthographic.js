import {
  PerspectiveCameraViewContext,
  PerspectiveCameraContext,
} from './perspective'

import { CameraUniforms, Camera } from '../core/camera'
import { ContextComponent } from'../core/components/context'
import { Component } from '../core/component'
import { assign } from '../utils'
import mat4 from 'gl-mat4'

const scratchMatrix = mat4.identity([])

export class OrthographicCamera extends Component {
  static defaults() {
    return { ...PerspectiveCamera.defaults(), near: 100, far: 1 }
  }

  constructor(ctx, initialState = {}) {
    assign(initialState, OrthographicCamera.defaults(), initialState)
    super(ctx, initialState,
      new Camera(ctx, initialState),
      new PerspectiveCameraContext(ctx, initialState),
      new PerspectiveCameraViewContext(ctx, initialState),
      new OrthographicCameraProjectionContext(ctx, initialState),
      new CameraUniforms(ctx, initialState),
    )
  }
}

export class OrthographicCameraProjectionContext extends Component {
  constructor(ctx, initialState) {
    assign(initialState, Camera.defaults(), initialState)
    super(ctx, initialState,
      new ContextComponent(ctx, {
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
      })
    )
  }
}
