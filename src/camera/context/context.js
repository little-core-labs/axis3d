import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'

import { CameraInverseViewContext } from './inverse-view'
import { CameraInfoContext } from './info'
import { CameraViewContext } from './view'
import { CameraEyeContext } from './eye'

export class CameraContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraContext.defaults())
    super(ctx, initialState,
      new CameraInfoContext(ctx, initialState),
      new CameraViewContext(ctx, initialState),
      new CameraInverseViewContext(ctx, initialState),
      new CameraEyeContext(ctx, initialState),
    )
  }
}

