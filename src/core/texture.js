'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from '../stats'
import { Command } from './command'
import window from 'global/window'

/**
  * @virtual {HTMLVideoElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
  */

const {HTMLVideoElement} = window

/**
  * @virtual {HTMLCanvasElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
  */

const {HTMLCanvasElement} = window

/**
  * @virtual {HTMLImageElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
  */

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

/**
 * Default underlying texture state.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#textures}
 */

export const kDefaultTextureState = Object.seal({
  min: 'linear',
  mag: 'linear',
})

/**
 * A Texture class represents an interface wrapping, uploading,
 * data.
 * and manipulating 2D texture data such as image, video, and canvas
 *
 * @public
 * @class Texture
 * @extends Command
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#textures}
 */

export class Texture extends Command {

  /**
   * Texture class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    incrementStat('Texture')
    super(update)

    // texture state used for in place regl
    // texture reinitialization
    const textureState = new TextureState(ctx, initialState || {})

    // injected texture context
    const {
      context = new TextureContext(ctx, textureState, initialState)
    } = initialState

    // regl context
    const injectContext = ctx.regl({context})

    // texture update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      textureState.update({
        ...initialState,
        ...state,
      })

      // inject texture context exposing useful
      // texture state variables
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
    if (data && isVideo(data) && data.readyState >= HAVE_ENOUGH_DATA) {
      return true
    } else if (data && isImage(data) || isCanvas(data)) {
      if (data.width && data.height) {
        return true
      }
    }
    return false
  }

  /**
   * Helper function to return a 2d vector
   * representing the texture data resolution.
   *
   * @public
   * @static
   * @method
   * @param {TextureState} textureState
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
    } else if (state.shape) {
      return state.shape
    } else if (state.width && state.height) {
      return [state.width, state.height]
    } else {
      return [0, 0]
    }
  }
}

/**
 * TextureContext class.
 *
 * @public
 * @class TextureContext
 */

export class TextureContext {

  /**
   * TextureContext class constructor.
   *
   * @public
   * @param {!Context} ctx Axis3D context.
   * @param {!TextureState} textureState Required texture state.
   * @param {?Object} initialState Optional initial context state.
   */

  constructor(ctx, textureState, initialState = {}) {
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

    /**
     * Underlying resolution of the texture data.
     *
     * @public
     * @type {Vector2|Array<Number>}
     */

    this.textureResolution = () => {
      return Texture.getTextureDataResolution(textureState, textureState.data)
    }

    /**
     * Underlying texture data.
     *
     * @public
     * @type {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement|TypedArray|Array|Mixed}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#textures}
     */

    this.textureData = () => {
      return textureState.data
    }

    /**
     * REGL texture pointer.
     *
     * @public
     * @type {Function}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#texture-constructor}
     */

    this.texture = () => {
      return textureState.texture
    }
  }
}

/**
 * TextureState class.
 *
 * @public
 * @class TextureState
 */

export class TextureState {

  /**
   * TextureState class constructor.
   *
   * @param {!Context} ctx Axis3D context.
   * @param {!Object} initialState Required initial state.
   */

  constructor(ctx, initialState = {}) {
    Object.assign(this, {
      ...kDefaultTextureState,
      ...initialState,
    })

    /**
     * Underlying texture pointer.
     */

    const texture = ctx.regl.texture({ ...this })

    /**
     * Texture state data stored as reference for injection
     * into the regl conext.
     */

    let {data = null} = initialState

    /**
     * Timestamp of last known update of a video texture.
     */

    let lastVideoUpdate = 0

    /**
     * Previous raw texture data.
     */

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

  /**
   * Updates internal texture state. Returns true if the internal texture
   * was updated, otherwise false.
   *
   * @public
   * @method
   * @param {Object} state
   * @param {Object} state.data
   * @return {Boolean}
   * @throws TypeError
   */

  update({data = this.data} = {}) {
    const now = this.ctx.regl.now()
    let needsUpdate = false

    if (Texture.isTextureDataReady(data)) {
      if (isVideo(data) && data.readyState >= HAVE_CURRENT_DATA) {
        needsUpdate = true
        if (now - this.lastVideoUpdate >= 0.01) {
          this.lastVideoUpdate = now
        }
      } else if (data != this.previouslyUploadedData) {
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      // computed texture data resolution
      const resolution = Texture.getTextureDataResolution(this, data)
      // mark for update if resolution is available and
      // the previously uploaded texture data defers from
      // the current input data
      if (!(resolution[0] > 0 && resolution[1] > 0)) {
        needsUpdate = false
      }
    }

    // update regl rexture state and set
    if (needsUpdate && data) {
      this.data = data
      this.previouslyUploadedData = data
      // update underlying regl texture
      if ('function' == typeof this.texture) {
        this.texture(this)
      } else {
        throw new TypeError(
        `TextureState expects .texture to be a function. `+
        `Got ${typeof this.texture}.`)
      }
    }

    return needsUpdate
  }
}
