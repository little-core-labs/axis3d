import { UniformsComponent } from './components/uniforms'
import { ContextComponent } from './components/context'
import { Component } from './component'
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

function isCubeTextureDataReady(data) {
  if (isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
    return true
  } else if (isImage(data) || isCanvas(data)) {
    if (data.width && data.height) {
      return true
    }
  }
  return false
}

function getCubeTextureDataResolution(data) {
  if (Array.isArray(data)) {
    data = data
      .filter((d) => d)
      .filter((d) => isImage(d) || isVideo(d) || d.shape.every(Boolean))
      [0]
    return getCubeTextureDataResolution(data)
  }
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

export class CubeTexture extends Component {
  static defaults() {
    return {
      uniformName: 'texCube',
      texture: { min: 'linear', mag: 'linear' }
    }
  }

  constructor(ctx, initialState = {}) {
    super(ctx, initialState,
      new CubeTextureDataContext(ctx, initialState),
      new CubeTexturePointerContext(ctx, initialState),
      new CubeTextureContext(ctx, initialState),
      new CubeTextureUniforms(ctx, initialState),
    )
  }
}

export class CubeTextureDataContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      cubeTextureData(ctx, args) {
        const data = get('data', [args, ctx, initialState])
        if (data && Array.isArray(data) && data.some(isCubeTextureDataReady)) {
          const [w, h] = getCubeTextureDataResolution(data)
          if (w && h) { return [ ...data ] }
        }
        return null
      }
    }))
  }
}

export class CubeTexturePointerContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    const cubeTexture = ctx.regl.cube({ ...initialState.texture })
    let faces = Array(6).fill(null)
    super(ctx, initialState, new ContextComponent(ctx, {
      cubeTexturePointer({cubeTextureData}) {
        let needsUpload = false
        if (Array.isArray(cubeTextureData)) {
          for (let i = 0 ; i < faces.length; ++i) {
            if (faces[i] != cubeTextureData[i]) {
              if (isCubeTextureDataReady(cubeTextureData[[i]])) {
                faces[i] = cubeTextureData[i]
                needsUpload = true
              }
            }
          }
        }
        const resolution = getCubeTextureDataResolution(faces)
        for (let i = 0; i < faces.length; ++i) {
          if (null == faces[i] || !isCubeTextureDataReady(faces[i])) {
            faces[i] = {shape: resolution}
          }
        }
        if (needsUpload) { cubeTexture(...faces) }
        return cubeTexture
      }
    }))
  }
}

export class CubeTextureContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, new ContextComponent(ctx, {
      cubeTextureUniformName() { return uniformName },
      cubeTextureResolution({cubeTextureData}) {
        return getCubeTextureDataResolution(cubeTextureData)
      }
    }))
  }
}

export class CubeTextureUniforms extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, new UniformsComponent(ctx, {
      [`${uniformName}.resolution`]: ({cubeTextureResolution}) => cubeTextureResolution,
      [`${uniformName}.data`]: ({cubeTexturePointer}) => cubeTexturePointer,
    }))
  }
}
