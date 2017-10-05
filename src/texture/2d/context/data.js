import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

import {
  getTextureDataResolution,
  isTextureDataReady,
  isCanvas,
  isImage,
  isVideo,
} from '../../utils'

export function TextureDataContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const loadedImages = {}
  const pendingImages = {}
  return ScopedContext(ctx, initialState, {
    textureData(ctx, {data}) {
      if (isImage(data)) {
        if (data.src in loadedImages) {
          return data
        } else {
          return reserve(data)
        }
      } else if (isVideo(data)) {
        if (isTextureDataReady(data)) {
          return data
        } else {
          return null
        }
      } else {
        return data || null
      }
    }
  })

  function reserve(image) {
    const {src} = image
    if (src in loadedImages) { return image }
    if (!(src in pendingImages)) {
      pendingImages[src] = new Image()
      Object.assign(pendingImages[src], {
        src, onload() {
          loadedImages[src] = image
          delete pendingImages[src]
        }
      })
    }
    return null
  }
}
