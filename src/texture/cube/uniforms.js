import { assignDefaults } from '../../utils'
import { ShaderUniforms } from '../../shader'
import * as defaults from './defaults'

export function CubeTextureShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {
    [`${uniformName}Resolution`]: ({cubeTextureResolution}) => cubeTextureResolution,
    [uniformName]: ({cubeTexturePointer}) => cubeTexturePointer,
  })
}
