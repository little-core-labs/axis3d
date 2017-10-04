import { CubeTextureContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'

export function CubeTexture(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return CubeTextureContext(ctx, initialState)
}
