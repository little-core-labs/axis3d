import { PerspectiveCameraContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'
import { Component } from '../../core'
import { Camera } from '../camera'

export class PerspectiveCamera extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCamera.defaults())
    super(ctx, initialState,
      new Camera(ctx, initialState),
      new PerspectiveCameraContext(ctx, initialState),
    )
  }
}
