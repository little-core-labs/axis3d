import { PerspectiveCameraContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'
import { Component } from '../../core'
import { Object3D } from '../../object3d'

export class PerspectiveCamera extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCamera.defaults())
    super(ctx, initialState,
      new Object3D(ctx, initialState),
      new PerspectiveCameraContext(ctx, initialState),
    )
  }
}
