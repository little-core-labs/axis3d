import { TextureContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'

export function Texture(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return TextureContext(ctx, initialState)
}
