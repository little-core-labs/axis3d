import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'
import raf from 'raf'

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
    const emptyTexture = ctx.regl.texture({ ...initialState.texture })
    const textureMap = new WeakMap()
    super(ctx, initialState,
      new ScopedContext(ctx, {
        texturePointer({textureData}, {copy}) {
          let texture = emptyTexture
          if (textureData) {
            texture = textureMap.get(textureData) || emptyTexture
            if (isImage(textureData)) {
              if (!textureMap.has(textureData)) {
                if (isTextureDataReady(textureData)) {
                  texture = ctx.regl.texture({
                    ...initialState.texture,
                    data: textureData
                  })
                  textureMap.set(textureData, texture)
                }
              }
            } else if (isVideo(textureData)) {
              if (!textureMap.has(textureData)) {
                texture = ctx.regl.texture({ ...initialState.texture })
                textureMap.set(textureData, texture)
              }
              if (isTextureDataReady(textureData)) {
                texture({ ...initialState.texture, data: textureData})
              }
            }
          }
          if (null == textureData && copy) {
            texture({ ...initialState.texture, copy })
          }
          return texture
        }
      })
    )
  }
}
