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
    const emptyTexture = ctx.regl.texture({ ...initialState })
    const textureBuffer = ctx.regl.texture(TexturePointerContext.defaults())
    const textureMap = new WeakMap()
    super(ctx, initialState,
      new ScopedContext(ctx, {
        texturePointer({textureData}, args = {}) {
          const {copy, subimage = false} = args
          let texture = emptyTexture
          const data = { ...initialState }
          if (textureData) {
            Object.assign(data, {data: textureData})
            texture = textureMap.get(textureData) || emptyTexture

            // create texture pointer and upload image data to texture pointer
            // otherwise subimage if requested
            if (isImage(textureData)) {
              if (!textureMap.has(textureData)) {
                createTexture()
              } else if (subimage) {
                subimageTexture()
              }
            }

            // create texture pointer and upload video data to texture pointer
            // subimage if requested, otherwise just update texture pointer
            // with textureData
            if (isVideo(textureData)) {
              if (!textureMap.has(textureData)) {
                createTexture()
              } else if (subimage) {
                subimageTexture()
              } else {
                updateTexture()
              }
            }

            // creates texture pointer and uploads viable data to texture pointer
            // otherwise subimage if requested
            if (texture == emptyTexture) {
              if (!textureMap.has(textureData)) {
                createTexture()
              } else if (subimage) {
                subimageTexture()
              }
            }
          }

          // if copy requested, swap
          if (null == textureData && copy) {
            texture = textureBuffer
            copyTexture()
          }

          return texture

          function subimageTexture() {
            if (isVideo(data) && data.paused) { return }
            if ('object' == typeof subimage) {
              const {x, y, level} = subimage
              texture.subimage(data, x, y, level)
            } else {
              texture.subimage(data)
            }
          }

          function createTexture() {
            texture = ctx.regl.texture(data)
            textureMap.set(textureData, texture)
          }

          function updateTexture() {
            if (isVideo(data) && data.paused) { return }
            texture(data)
          }

          function copyTexture() {
            textureBuffer({
              x: args.x,
              y: args.y,
              width: args.width,
              height: args.height,
            })
          }
        }
      })
    )
  }
}
