import { assignDefaults } from '../../utils'
import { ShaderUniforms } from '../../shader'
import { Component } from '../../core'
import * as defaults from './defaults'

export class TextureShaderUniforms extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, TextureShaderUniforms.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
        resolution({textureResolution}) { return textureResolution },
        data({texturePointer}) { return texturePointer },
      })
    )
  }
}
