import { getTextureDataResolution } from '../../utils'
import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

export function TextureInfoContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ScopedContext(ctx, {
    textureUniformName() { return uniformName },
    textureResolution({textureData}) {
      return getTextureDataResolution(textureData)
    }
  })
}
