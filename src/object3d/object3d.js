import { Object3DContext } from './context'
import { assignDefaults } from '../utils'
import { Component } from '../core'
import * as defaults from './defaults'

export class Object3D extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3D.defaults())
    super(ctx, initialState,
      new Object3DContext(ctx, initialState))
  }
}

