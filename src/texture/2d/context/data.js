import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  getTextureDataResolution,
  isTextureDataReady,
  isVideo
} from '../../utils'

export class TextureDataContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, TextureDataContext.defaults())
    super(ctx, initialState, new ScopedContext(ctx, {
      textureData(ctx, args) {
        const data = get('data', [args, ctx])
        if (data && isTextureDataReady(data)) {
          const [w, h] = getTextureDataResolution(data)
          if (w && h) { return data }
        }
        return null
      }
    }))
  }
}
