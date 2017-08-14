import { OrthographicCameraProjectionContext } from './projection'
import { OrthographicCameraInfoContext } from './info'
import { OrthographicCameraViewContext } from './view'
import { assignDefaults } from '../../../utils'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  CameraInverseViewContext,
  CameraInfoContext,
  CameraEyeContext,
} from '../../context'

export class OrthographicCameraContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCameraContext.defaults())
    super(ctx, initialState,
      new CameraInfoContext(ctx, initialState),
      new OrthographicCameraInfoContext(ctx, initialState),
      new OrthographicCameraViewContext(ctx, initialState),
      new OrthographicCameraProjectionContext(ctx, initialState),
      new CameraInverseViewContext(ctx, initialState),
      new CameraEyeContext(ctx, initialState),
    )
  }
}
