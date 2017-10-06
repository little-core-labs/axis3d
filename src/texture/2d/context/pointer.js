import { texture as extend } from 'regl-extend'
import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

import { HAVE_CURRENT_DATA, isImage, isVideo, } from '../../utils'

export function TexturePointerContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const defaultTexture = ctx.regl.texture(defaults)
  const textureBuffer = ctx.regl.texture(extend(initialState))
  const textureMap = new WeakMap()
  const videoUploadTimestamps = new WeakMap()
  return ScopedContext(ctx, {
    texturePointer({textureData}, args = {}) {
      const {copy = false, buffer = false, subimage = false} = args
      let texture = defaultTexture
      const data = { ...initialState }
      if (true == buffer) {
        return textureBuffer
      } else if (textureData) {
        Object.assign(data, {data: textureData})
        texture = textureMap.get(textureData) || defaultTexture

        // create texture pointer and upload image data to texture pointer
        // otherwise subimage if requested
        if (isImage(textureData)) {
          if (textureData && !textureMap.has(textureData)) {
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
          } else {
            updateTexture()
          }
        }

        // creates texture pointer and uploads viable data to texture pointer
        // otherwise subimage if requested
        if (texture == defaultTexture) {
          if (!textureMap.has(textureData)) {
            createTexture()
          } else if (subimage) {
            subimageTexture()
          }
        }
      }

      // if copy requested, swap
      if (null == textureData && true == copy) {
        texture = textureBuffer
        copyTexture()
      }

      return texture

      function subimageTexture() {
        if (textureOwnsData(textureData)) {
          if ('object' == typeof subimage) {
            const {x, y, level} = subimage
            texture.subimage(data, x, y, level)
          } else {
            texture.subimage(data)
          }
        }
      }

      function createTexture() {
        texture = ctx.regl.texture(data)
        if (textureData) {
          textureMap.set(textureData, texture)
        }
      }

      function updateTexture() {
        if (false == textureOwnsData(textureData)) { return }
        if (isVideo(textureData)) {
          const lastUpload = videoUploadTimestamps.get(textureData) || 0
          if (!lastUpload || Date.now() - lastUpload > 16) {
            if (subimage) { subimageTexture() }
            else { texture(data) }
            videoUploadTimestamps.set(textureData, Date.now())
          }
        } else if (subimage) {
          subimageTexture()
        } else {
          texture(data)
        }
      }

      function copyTexture() {
        const textureBufferArgs = {}
        if ('x' in args) { textureBufferArgs.x = args.x }
        if ('y' in args) { textureBufferArgs.y = args.y }
        if ('width' in args) { textureBufferArgs.width = args.width }
        if ('height' in args) { textureBufferArgs.height = args.height }
        textureBuffer({ ...textureBufferArgs, copy: true })
      }

      function textureOwnsData(d) {
        return textureMap.get(d) == texture
      }
    }
  })
}
