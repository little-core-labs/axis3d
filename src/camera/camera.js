import { assignDefaults } from '../utils'
import { CameraContext } from './context'
import * as defaults from './defaults'
import { Component } from '../core'
import { Object3D } from '../object3d'

export class Camera extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Camera.defaults())
    super(ctx, initialState,
      new Object3D(ctx),
      new CameraContext(ctx, initialState),
    )
  }
}
