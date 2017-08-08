import { OrthographicCameraContext } from './context'
import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from './defaults'
import { Camera } from '../camera'

export class OrthographicCamera extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCamera.defaults())
    super(ctx, initialState,
      new Camera(ctx, initialState),
      new OrthographicCameraContext(ctx, initialState),
    )
  }
}
