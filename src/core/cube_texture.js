'use strict'
import { DynamicValue, ShaderUniforms } from './gl'
import { kDefaultTextureState } from './texture'
import { incrementStat } from '../stats'
import { assignTypeName } from './types'
import { Command } from './command'
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
} = HTMLVideoElement

export const kDefaultTextures = (() => {
  return new Array(6).fill(kDefaultTextureState)
})()

export class CubeTexture extends Command {
  static defaults() {
    return {
      uniformName: 'texCube'
    }
  }
  constructor(ctx, initialState = {}) {
    incrementStat('CubeTexture')
    super(update)

    this.typeName = 'cubetexture'
    assignTypeName(this, 'cubetexture')

    // cube texture state used for in place regl
    // cube texture reinitialization
    const cubeTextureState = new CubeTextureState(ctx, initialState || {})

    // injected texture context
    const context = new CubeTextureContext(ctx, cubeTextureState, initialState)
    const uniforms = new CubeTextureUniforms(ctx, initialState)

    // regl context
    const injectContext = ctx.regl({context, uniforms})

    // cube texture update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      let data = state
      cubeTextureState.update({
        ...initialState,
        data
      })

      // inject cube texture context exposing useful
      // cube texture state variables
      injectContext(block)

      return this
    }
  }

  /**
   * A predicate helper function to determine if
   * given data is ready for upload
   *
   * @public
   * @static
   * @method
   * @param {Mixed} data
   * @return {Boolean}
   */

  static isTextureDataReady(data) {
    if (data) {
      if (isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
        return true
      } else if (isImage(data) || isCanvas(data)) {
        if (data.width && data.height) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Helper function to return a 2d vector
   * representing the cube texture data resolution.
   *
   * @public
   * @static
   * @method
   * @param {TextureState} state
   * @param {Mixed} data
   * @return {Array<Number>|Vector2}
   */

  static getTextureDataResolution(state, data) {
    if (isImage(data) || isCanvas(data)) {
      return [data.width, data.height]
    } else if (isVideo(data)) {
      return [data.videoWidth || 0, data.videoHeight || 0]
    } else if (data && data.shape) {
      return data.shape
    } else if (state && state.shape) {
      return state.shape
    } else if (state && state.width && state.height) {
      return [state.width, state.height]
    } else {
      return [0, 0]
    }
  }
}

export class CubeTextureState {
  constructor(ctx, initialState = []) {
    Object.assign(this, {
      ...initialState,
    })

    let {data = kDefaultTextures} = initialState
    const texture = ctx.regl.cube( ...data )
    let lastVideoUpdate = 0
    let previouslyUploadedData = null

    // protected properties
    Object.defineProperties(this, {
      ctx: {
        enumerable: false,
        get() { return ctx },
      },

      data: {
        enumerable: true,
        get() { return data || null },
        set(value) { data = value },
      },

      texture: {
        enumerable: false,
        get() { return texture },
      },

      lastVideoUpdate: {
        enumerable: false,
        set(value) { lastVideoUpdate = value },
        get() { return lastVideoUpdate },
      },

      previouslyUploadedData: {
        enumerable: false,
        set(value) { previouslyUploadedData = value },
        get() { return previouslyUploadedData },
      },
    })
  }

  update({data = this.data} = []) {
    const now = this.ctx.regl.now()
    let needsUpdate = false
    let ready = true

    // handle if array is passed inside a data obj
    if (data && 'undefined' === typeof data.length) {
      data = data.data || this.data
    }

    // don't re-check if media is ready
    if (null == this.previouslyUploadedData) {
      for (let i = 0; i < data.length; i++) {
        const loaded = CubeTexture.isTextureDataReady(data[i])
        if (!loaded) {
          this.data = data
          return
        }
      }
    }

    if (ready) {
      for (let i = 0; i < data.length; i++) {
        if (isVideo(data[i]) && data[i].readyState >= HAVE_CURRENT_DATA) {
          needsUpdate = true
          if (now - this.lastVideoUpdate >= 0.01) {
            this.lastVideoUpdate = now
          }
        } else if (this.previouslyUploadedData == null || data[i] != this.previouslyUploadedData[i]) {
          needsUpdate = true
        }
      }
    }

    if (needsUpdate) {
      for (let i = 0; i < data.length; i++) {
        // computed cube texture data resolution
        const resolution = CubeTexture.getTextureDataResolution(this, data[i])
        // mark for update if resolution is available and
        // the previously uploaded any of the cube texture data differs from
        // the current input data
        if ( !(resolution[0] > 0 && resolution[1] > 0) ) {
          return
        }
      }
    }

    // update regl cube texture and set
    if (needsUpdate && data) {
      this.data = data
      for (let p = 0; p < data.length; p++) {
        this.previouslyUploadedData = this.previouslyUploadedData || []
        this.previouslyUploadedData[p] = data[p]
      }
      // update underlying regl texture
      if ('function' == typeof this.texture) {
        this.texture( ...this.data )
      } else {
        throw new TypeError(
          `TextureState expects .texture to be a function. ` +
          `Got ${typeof this.texture}.`
        )
      }
    }

    return needsUpdate
  }
}

export class CubeTextureContext extends DynamicValue {
  constructor(ctx, textureState, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState)
    // protected properties
    Object.defineProperties(this, {
      data: {
        enumerable: false,
        get() { return textureState.data },
      },

      textureState: {
        enumerable: false,
        get() { return textureState }
      },
    })

    this.cubeTextureUniformName = () => uniformName

    this.cubeTextureResolution = () => {
      return CubeTexture.getTextureDataResolution(textureState, textureState.data)
    }

    this.cubeTextureData = () => {
      return textureState.data
    }

    this.cubeTexture = () => {
      return textureState.texture
    }
  }
}

export class CubeTextureUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, CubeTexture.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, {
      [`${uniformName}.resolution`]: ({cubeTextureResolution}) => cubeTextureResolution,
      [`${uniformName}.data`]: ({cubeTexture}) => cubeTexture,
    })
  }
}
