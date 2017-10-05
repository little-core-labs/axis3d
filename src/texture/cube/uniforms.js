import { assignDefaults } from '../../utils'
import { ShaderUniforms } from '../../shader'
import * as defaults from './defaults'

export function CubeTextureShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
    resolution({cubeTextureResolution}) { return cubeTextureResolution },
    data({cubeTexturePointer}) { return cubeTexturePointer },
  })
}
