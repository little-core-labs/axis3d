import { TextureShaderUniforms } from './uniforms'
import { TextureContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'
import { Component } from '../../core'

export class Texture extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}, ...children) {
    assignDefaults(initialState, Texture.defaults())
    super(ctx, initialState,
      new TextureContext(ctx, initialState),
      new TextureShaderUniforms(ctx, initialState))
  }
}
