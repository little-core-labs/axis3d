import { assignDefaults } from '../../utils'
import { ShaderUniforms } from '../../shader'
import * as defaults from './defaults'

export function TextureShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {}, {
    [`${uniformName}Resolution`]: ({textureResolution}) => textureResolution,
    [uniformName]: ({texturePointer}) => texturePointer,
  })
}
