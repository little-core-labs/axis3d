import { getCubeTextureDataResolution } from '../../utils'
import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

export function CubeTextureInfoContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ScopedContext(ctx, {
    cubeTextureUniformName() { return uniformName },
    cubeTextureResolution({cubeTextureData}) {
      return getCubeTextureDataResolution(cubeTextureData)
    }
  })
}
