'use strict'

/**
 * Module dependencies.
 */

import 'webvr-polyfill'

import {
  InputContext,
  InputState,
  Input,
} from '../core/input'

import coalesce from 'defined'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export const kWebVRInputLeftEye = 0
export const kWebVRInputRightEye = 1

export class WebVRInput extends Input {
  constructor(ctx, initialState = {}) {
    const {context = new WebVRInputContext(ctx, initialState)} = initialState
    const {state = new WebVRInputState} = initialState

    const setEye = ctx.regl({
      ...state,
      context,
    })

    super(ctx, {
      update(args, block) {
        if ('function' == typeof args) {
          block = args
          args = {}
        }

        let {eyes = 2} = args
        if ('number' != typeof eyes || eyes < 0 || eyes > 2) {
          eyes = 2
        }

        if (2 == eyes) {
          setEye({ ...args, eye: kWebVRInputLeftEye }, block)
          setEye({ ...args, eye: kWebVRInputRightEye }, block)
        } else {
          setEye({ ...args, eye: kWebVRInputLeftEye, middle: 1 }, block)
        }
      }
    })
  }
}

export class WebVRInputContext extends InputContext {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
    const {vrFrameData = new VRFrameData()} = initialState

    this.vrFrameData = ({}, args) => {
      args = args || {}
      const {vrDisplay, eye} = args
      if (eye == kWebVRInputLeftEye) {
        vrDisplay.getFrameData(vrFrameData)
      }
      return vrFrameData
    }

    this.projection = ({}, args) => {
      args = args || {}
      const {eye} = args
      if (eye == kWebVRInputLeftEye) {
        return vrFrameData.leftProjectionMatrix
      } else if (eye == kWebVRInputRightEye) {
        return vrFrameData.rightProjectionMatrix
      } else {
        return kMat4Identity
      }
    }

    this.view = ({}, args) => {
      args = args || {}
      const {eye} = args
      if (eye == kWebVRInputLeftEye) {
        return vrFrameData.leftViewMatrix
      } else if (eye == kWebVRInputRightEye) {
        return vrFrameData.rightViewMatrix
      } else {
        return kMat4Identity
      }
    }

    this.eye = ({}, args) => {
      args = args || {}
      const {eye} = args
      return coalesce(eye, null)
    }

    this.pose = () => {
      return vrFrameData.pose
    }
  }
}

export class WebVRInputState extends InputState {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
    this.viewport = (...args) => this.calculateViewport(...args)
    this.scissor = {
      enable: true,
      box: (...args) => this.calculateViewport(...args)
    }
  }

  calculateViewport({
    drawingBufferWidth: width,
    drawingBufferHeight: height,
  }, args) {
    args = args || {}
    const {eye, middle = 0.5} = args
    return {
      x: middle*eye*width,
      y: 0,
      width: middle*width,
      height: height
    }
  }
}
