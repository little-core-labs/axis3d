'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from '../stats'
import { Command } from './command'
import { TextureState, TextureContext, kDefaultTextureState } from './texture'
import window from 'global/window'

/**
  * @virtual {HTMLVideoElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
  */

const {HTMLVideoElement} = window

/**
  * @virtual {HTMLVideoElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
  */

const {HTMLCanvasElement} = window

/**
  * @virtual {HTMLVideoElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
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
 * Array of 6 default underlying texture states.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#cube-maps}
 */

export const kDefaultTextures = (() => {
  return new Array(6).fill(kDefaultTextureState)
})()

/**
 * Cube Texture class represents an interface wrapping the
 * uploading of data.  Also the // TODO: finish writing this
 * manipulating 2D texture data such as image, video, and canvas.
 *
 * @public
 * @class Texture
 * @extends Command
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#cube-maps}
 */

export class CubeTexture extends Command {

  /**
   * Cube Texture class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    incrementStat('Texture')
    super(update)

    // cube texture state used for in place regl
    // cube texture reinitialization
    const textureState = new CubeTextureState(ctx, initialState || {})

    // injected texture context
    const {
      context = new TextureContext(ctx, textureState, initialState)
    } = initialState

    // regl context
    const injectContext = ctx.regl({context})

    // cube texture update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      let data = state
      textureState.update({
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
    data = data[0]
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

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
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

/**
 * CubeTextureState class.
 *
 * @public
 * @class TextureState
 */

export class CubeTextureState {

  /**
   * TextureState class constructor.
   *
   * @param {!Context} ctx Axis3D context.
   * @param {!Object} initialState Required initial state.
   */

  constructor(ctx, initialState = []) {
    Object.assign(this, {
      ...initialState,
    })

    let {data = kDefaultTextures} = initialState

    /**
     * Underlying cube texture pointer.
     */

    const texture = ctx.regl.cube( ...data )

    /**
     * Texture state data stored as reference for injection
     * into the regl conext.
     */

    // let data = [] = initialState
    // data.arr = []

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
   * Updates internal cube texture state. Returns true if the internal
   * cube texture was updated, otherwise false.
   *
   * @public
   * @method
   * @param {Object} state
   * @param {Object} state.data
   * @return {Boolean}
   * @throws TypeError
   */

  update({data = this.data} = []) {
    const now = this.ctx.regl.now()
    let needsUpdate = false

    if (CubeTexture.isTextureDataReady(data)) {
      if (isVideo(data) && data.readyState >= HAVE_CURRENT_DATA) {
        needsUpdate = true
        if (now - this.lastVideoUpdate >= 0.01) {
          this.lastVideoUpdate = now
        }
      } else if (data != this.previouslyUploaderData) {
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      // computed cube texture data resolution
      const resolution = CubeTexture.getTextureDataResolution(this, data)

      // mark for update if resolution is available and
      // the previously uploaded cube texture data differs from
      // the current input data
      /////////  TODO @vipyne FIX THIS
      // if ( !(resolution[0] > 0 && resolution[1] > 0) ) {
      //   needsUpdate = false
      // }
    }

    // update regl cube texture and set
    if (needsUpdate && data) {
      this.data = data
      this.previouslyUploaderData = data
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
