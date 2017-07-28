import { DynamicValue, ShaderUniforms } from './gl'
import { Command } from './command'
import { Entity } from './entity'
import { get } from '../utils'
import window from 'global/window'

const {HTMLVideoElement} = window
const {HTMLCanvasElement} = window
const {HTMLImageElement} = window

// predicate helpers
const isCanvas = (d) => d instanceof HTMLCanvasElement
const isVideo = (d) => d instanceof HTMLVideoElement
const isImage = (d) => d instanceof HTMLImageElement

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
const {
  HAVE_NOTHING = 0,
  HAVE_METADATA = 1,
  HAVE_CURRENT_DATA = 2,
  HAVE_FUTURE_DATA = 3,
  HAVE_ENOUGH_DATA = 4,
} = (HTMLVideoElement || {})

export const kDefaultTextureState = Object.seal({ min: 'linear', mag: 'linear', })

function isTextureDataReady(data) {
  if (isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
    return true
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true
    }
  }
  return false
}

function getTextureDataResolution(data) {
  if (isImage(data) || isCanvas(data)) {
    return [data.width, data.height]
  } else if (isVideo(data)) {
    return [data.videoWidth || 0, data.videoHeight || 0]
  } else if (data && data.shape) {
    return data.shape
  } else {
    return [0, 0]
  }
}

export class Texture extends Entity {
  static defaults() {
    return {
      uniformName: 'tex2d',
      texture: {
        min: 'linear',
        mag: 'linear',
      }
    }
  }
  constructor(ctx, initialState = {}) {
    super(ctx, initialState, Entity.compose(ctx, [
      ctx.regl({context: new TextureDataContext(ctx, initialState)}),
      ctx.regl({context: new TexturePointerContext(ctx, initialState)}),
      ctx.regl({context: new TextureContext(ctx, initialState)}),
      ctx.regl({uniforms: new TextureUniforms(ctx, initialState)}),
    ]))
  }
}

export class TextureDataContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Texture.defaults(), initialState)
    super(ctx, initialState, {
      textureData(ctx, args) {
        const data = get('data', [args, ctx, initialState])
        if (data && isTextureDataReady(data)) {
          const [w, h] = getTextureDataResolution(data)
          if (w && h) {
            return data
          }
        }
        return null
      }
    })
  }
}

export class TexturePointerContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Texture.defaults(), initialState)
    const texture = ctx.regl.texture({ ...initialState.texture })
    let previouslyUploadedData = null
    super(ctx, initialState, {
      texturePointer({textureData}) {
        if (textureData){
          if (isImage(textureData)) {
            if (textureData != previouslyUploadedData) {
              texture({...initialState.texture, data: textureData})
              previouslyUploadedData = textureData
            }
          }
        }
        return texture
      }
    })
  }
}

export class TextureContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Texture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, {
      textureUniformName() {
        return uniformName
      },

      textureResolution({textureData}) {
        return getTextureDataResolution(textureData)
      },
    })
  }
}

export class TextureUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Texture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, {
      [`${uniformName}.resolution`]: ({textureResolution}) => textureResolution,
      [`${uniformName}.data`]: ({texturePointer}) => texturePointer,
    })
  }
}
