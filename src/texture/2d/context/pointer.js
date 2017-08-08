import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  getTextureDataResolution,
  isTextureDataReady,
  isImage,
  isVideo,
} from '../../utils'

export class TexturePointerContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, TexturePointerContext.defaults())
    const texture = ctx.regl.texture({ ...initialState.texture })
    let previouslyUploadedData = null
    super(ctx, initialState,
      new ScopedContext(ctx, {
        texturePointer({textureData}) {
          if (textureData){
            if (isImage(textureData)) {
              if (textureData != previouslyUploadedData) {
                texture({...initialState.texture, data: textureData})
                previouslyUploadedData = textureData
              }
            } else if (isVideo(textureData) && isTextureDataReady(textureData)) {
              texture({...initialState.texture, data: textureData})
              previouslyUploadedData = textureData
            }
          }
          return texture
        }
      })
    )
  }
}
