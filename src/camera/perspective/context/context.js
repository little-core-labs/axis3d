import { PerspectiveCameraProjectionContext } from './projection'
import { PerspectiveCameraInfoContext } from './info'
import { PerspectiveCameraViewContext } from './view'
import { CameraEyeContext } from '../../context'
import { assignDefaults } from '../../../utils'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class PerspectiveCameraContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCameraContext.defaults())
    super(ctx, initialState,
      new PerspectiveCameraInfoContext(ctx, initialState),
      new PerspectiveCameraProjectionContext(ctx, initialState),
      new PerspectiveCameraViewContext(ctx, initialState),
      new CameraEyeContext(ctx, initialState),
    )
  }
}

