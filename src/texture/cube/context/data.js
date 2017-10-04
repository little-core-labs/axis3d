import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

import {
  getCubeTextureDataResolution,
  isCubeTextureDataReady
} from '../../utils'

export function CubeTextureDataContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, {
    cubeTextureData(ctx, args) {
      const data = pick('data', [args, ctx, initialState])
      if (data && Array.isArray(data) && data.some(isCubeTextureDataReady)) {
        const [w, h] = getCubeTextureDataResolution(data)
        if (w && h) { return [ ...data ] }
      }
      return null
    }
  })
}
