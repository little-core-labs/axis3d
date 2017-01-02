'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from './stats'
import { Command } from './command'

module.exports = exports = (...args) => new TextureCommand(...args)
export class TextureCommand extends Command {
  constructor(ctx, opts = {}) {
    incrementStat('Texture')

    const {regl} = ctx

    // predicate helpers
    const isCanvas = (d) => d instanceof HTMLCanvasElement
    const isVideo = (d) => d instanceof HTMLVideoElement
    const isImage = (d) => d instanceof HTMLImageElement

    //
    // predicate helper function to determine if
    // given data is ready for upload
    //
    function isDataReady(data) {
      if (!data) { return false }
      if (isVideo(data)) {
        if (data.readyState < data.HAVE_ENOUGH_DATA) {
          return false
        }
      } else if (isImage(data) || isCanvas(data)) {
        if (!data.width || !data.height) {
          return false
        }
      }
      return true
    }

    //
    // Helper function to return a 2d vector
    // representing the texture data resolution
    //
    function getTextureResolution() {
      if (isImage(data) || isCanvas(data)) {
        return [data.width, data.height]
      } else if (isVideo(data)) {
        return [data.videoWidth, data.videoHeight]
      } else if (data && data.shape) {
        return data.shape
      } else if (textureState.shape) {
        return textureState.shape
      } else if (textureState.width && textureState.height) {
        return [textureState.width, textureState.height]
      } else {
        return [0, 0]
      }
    }

    // texture state used for in place regl
    // texture reinitialization
    let textureState = {
      min: 'linear',
      mag: 'linear',
      ...opts
    }

    // initial texture state that is used to reset
    // the texture state for the regl texture
    const initialTextureState = Object.freeze({
      ...textureState
    })

    // remove data from initial texture state if it is
    // not a texture valid shape
    if (textureState.data) {
      const {data} = textureState
      if (false == isDataReady(textureState.data)) {
        delete textureState.data
      }
    }

    // wrapped regl texture initialized without data
    const texture = regl.texture(textureState)

    // regl context
    const injectContext = regl({
      context: {
        textureResolution: () => getTextureResolution(),
        textureData: () => textureState.data,
        texture: () => texture,
      }
    })

    // data state
    let data = textureState.data
    let previouslyUploadedData = null

    // texture update function
    super((state, block) => {
      const noop = () => void 0

      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || noop

      let {
        // indicates if the internal regl texture needs an update
        needsUpdate = false
      } = state

      // potential texture state if an updated is needed
      textureState = {
        ...initialTextureState
      }

      // try to determine if an update is needed from user
      // state input
      for (let key in state) {
        if ('object' != typeof state[key] &&
            textureState[key] != state[key]) {
          needsUpdate = true
        }
        textureState[key] = state[key]
      }

      if ('data' in state) {
        if (data != state.data) {
          data = state.data
          needsUpdate = true
        }
      }

      // texture data is set from user state input
      // falling back on the initial texture data
      // provided as a default
      if (null == data && initialTextureState.data) {
        if (isDataReady(initialTextureState.data)) {
          data = initialTextureState.data
          needsUpdate = true
        }
      }

      // previous call had texture data to upload, but
      // the current does not and the texture was not
      // initialized with default texture data
      if (null == data &&
          null == initialTextureState.data &&
          null != previouslyUploadedData) {
        needsUpdate = true
      }

      // video data from a video element is streaming
      // and should always be updated
      if (isVideo(data)) {
        if (data.readyState >= data.HAVE_CURRENT_DATA) {
          needsUpdate = true
        }
      }

      // computed texture data resolution
      const resolution = getTextureResolution()

      // mark for update if resolution is available and
      // the previously uploaded texture data defers from
      // the current input data
      if (resolution[0] > 0 && resolution[1] > 0) {
        if (data != previouslyUploadedData) {
          needsUpdate = true
        }
      }

      // update regl rexture state and set
      if (needsUpdate) {
        previouslyUploadedData = data
        texture(textureState)
      }

      // inject texture context exposing useful
      // texture state variables
      injectContext(block)
    })
  }
}
