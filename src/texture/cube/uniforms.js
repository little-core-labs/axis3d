import { assignDefaults } from '../../utils'
import { ShaderUniforms } from '../../shader'
import { Component } from '../../core'
import * as defaults from './defaults'

export class CubeTextureShaderUniforms extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, CubeTextureShaderUniforms.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
        resolution({cubeTextureResolution}) { return cubeTextureResolution },
        data({cubeTexturePointer}) { return cubeTexturePointer },
      })
    )
  }
}
