import { PerspectiveCameraProjectionContext } from './projection'
import { PerspectiveCameraInfoContext } from './info'
import { PerspectiveCameraViewContext } from './view'
import { assignDefaults } from '../../../utils'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  CameraInverseViewContext,
  CameraInfoContext,
  CameraEyeContext,
} from '../../context'

export class PerspectiveCameraContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCameraContext.defaults())
    super(ctx, initialState,
      new CameraInfoContext(ctx, initialState),
      new PerspectiveCameraInfoContext(ctx, initialState),
      new PerspectiveCameraViewContext(ctx, initialState),
      new PerspectiveCameraProjectionContext(ctx, initialState),
      new CameraInverseViewContext(ctx, initialState),
      new CameraEyeContext(ctx, initialState),
    )
  }
}

