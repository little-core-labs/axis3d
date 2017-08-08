import { PerspectiveCameraViewContext } from '../../perspective'
import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class OrthographicCameraViewContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCameraViewContext.defaults())
    super(ctx, initialState,
      new PerspectiveCameraViewContext(ctx, initialState)
    )
  }
}
