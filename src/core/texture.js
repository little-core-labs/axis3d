import { UniformsComponent } from './components/uniforms'
import { ContextComponent } from './components/context'
import { get } from '../utils'
import { defaults as setInitialState } from '../utils'
import { Component } from './component'
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

function isTextureDataReady(data) {
  const resolution = getTextureDataResolution(data)
  if (!resolution[0] || !resolution[1]) { return false }
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

export class Texture extends Component {
  static defaults() {
    return {
      ...Component.defaults(),
      uniformName: 'tex2d',
      texture: { min: 'linear', mag: 'linear' }
    }
  }

  constructor(ctx, initialState = {}, ...children) {
    super(ctx, initialState,
      new TextureDataContext(ctx, initialState),
      new TexturePointerContext(ctx, initialState),
      new TextureContext(ctx, initialState),
      new TextureUniforms(ctx, initialState))
  }
}

export class TextureDataContext extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Texture.defaults())
    debugger
    if (initialState.map) {
      super(ctx, initialState, new ContextComponent(ctx, {
        textureData(ctx, args) {
          const data = get('data', [args, ctx, initialState])
          if (data && isTextureDataReady(data)) {
            const [w, h] = getTextureDataResolution(data)
            if (w && h) { return data }
          }
          return null
        }
      }))
    } else {
      super(ctx, initialState, new ContextComponent(ctx, {
        envTextureData(ctx, args) {
          const data = get('data', [args, ctx, initialState])
          if (data && isTextureDataReady(data)) {
            const [w, h] = getTextureDataResolution(data)
            if (w && h) { return data }
          }
          return null
        }
      }))
    }
  }
}

export class TexturePointerContext extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Texture.defaults())
    const texture = ctx.regl.texture({ ...initialState.texture })
    let previouslyUploadedData = null
    super(ctx, initialState, new ContextComponent(ctx, {
      texturePointer({textureData}) {
        if (textureData){
          if (isImage(textureData)) {
            if (textureData != previouslyUploadedData) {
              texture({...initialState.texture, data: textureData})
              previouslyUploadedData = textureData
            }
          } else if (isVideo(textureData) && isTextureDataReady(textureData)) {
            texture({...initialState.texture, data: textureData})
          }
        }
        return texture
      },
      envTexturePointer({envTextureData}) {
        if (envTextureData){
          if (isImage(envTextureData)) {
            if (envTextureData != previouslyUploadedData) {
              texture({...initialState.texture, data: envTextureData})
              previouslyUploadedData = envTextureData
            }
          } else if (isVideo(envTextureData) && isTextureDataReady(envTextureData)) {
            texture({...initialState.texture, data: envTextureData})
          }
        }
        return texture
      }
    }))
  }
}

export class TextureContext extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Texture.defaults())
    const {uniformName,
      envmap,
      map} = initialState
    super(ctx, initialState,
      new ContextComponent(ctx, {
        textureUniformName() { if (map) { return 'map' } },
        textureResolution({textureData}) {
          return getTextureDataResolution(textureData)
        },
        envTextureUniformName() { if (envmap) { return 'env' } },
        envTextureResolution({envTextureData}) {
          return getTextureDataResolution(envTextureData)
        }
      }))
  }
}

export class TextureUniforms extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Texture.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new UniformsComponent(ctx, {prefix: `${uniformName}.`}, {
        resolution({textureResolution, envTextureResolution = textureResolution}) {
          debugger
          if ('map' == uniformName) {
            return textureResolution
          } else {
            return envTextureResolution
          }
        },
        data({texturePointer, envTexturePointer = texturePointer}) {
          debugger
          if ('map' == uniformName) {
            return texturePointer
          } else {
            return envTexturePointer
          }
        }
      })
    )
  }
}
