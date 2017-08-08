import { PerspectiveCameraInfoContext } from '../../perspective'
import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class OrthographicCameraInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCameraInfoContext.defaults())
    super(ctx, initialState,
      new PerspectiveCameraInfoContext(ctx, initialState)
    )
  }
}
