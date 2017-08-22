import { TextureContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'
import { Component } from '../../core'

export class Texture extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Texture.defaults())
    super(ctx, initialState,
      new TextureContext(ctx, initialState))
  }
}
