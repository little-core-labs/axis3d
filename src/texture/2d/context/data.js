import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

import {
  getTextureDataResolution,
  isTextureDataReady,
  isVideo
} from '../../utils'

export function TextureDataContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, {
    textureData(ctx, args) {
      const data = pick('data', [args, ctx])
      if (data && isTextureDataReady(data)) {
        const [w, h] = getTextureDataResolution(data)
        if (w && h) { return data }
      }
      return null
    }
  })
}
