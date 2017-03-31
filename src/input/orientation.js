'use strict'

/**
 * Module dependencies.
 */

import 'webvr-polyfill'

import { getScreenOrientation, radians } from '../utils'
import { Quaternion, Euler } from '../math'
import { registerStat } from '../stats'
import { Command } from '../core/command'

import window from 'global/window'
import events from 'dom-events'
import quat from 'gl-quat'
import raf from 'raf'

/**
 * Global orientation state object.
 * @private
 */

export const globalState = {
  hasDeviceOrientation: false,
  absolute: null,

  currentAlpha: 0, // z
  currentBeta: 90, // x
  currentGamma: 0, // y

  deltaAlpha: 0,
  deltaBeta: 0,
  deltaGamma: 0,

  prevAlpha: 0,
  prevBeta: 0,
  prevGamma: 0,
}

// update global device orientation state
events.on(window, 'deviceorientation', (e) => {
  // ZXY
  const { alpha, beta, gamma, absolute } = e

  if (null != alpha && null != beta && null != gamma) {
    globalState.hasDeviceOrientation = true
  } else {
    globalState.hasDeviceOrientation = false
    return
  }

  Object.assign(globalState, {
    absolute,

    currentAlpha: alpha,
    currentBeta: beta,
    currentGamma: gamma,

    deltaAlpha: alpha - globalState.currentAlpha,
    deltaBeta: beta - globalState.currentBeta,
    deltaGamma: gamma - globalState.currentGamma,

    prevAlpha: globalState.currentAlpha,
    prevBeta: globalState.currentBeta,
    prevGamma: globalState.currentGamma,
  })

  raf(() => Object.assign(globalState, {
    deltaAlpha: 0,
    deltaBeta: 0,
    deltaGamma: 0,
  }))
})

// expose device motion state
events.on(window, 'devicemotion', (e) => {
  Object.assign(globalState, {
    accelerationIncludingGravity: e.accelerationIncludingGravity,
    acceleration: e.acceleration,
    rotationRate: e.rotationRate,
    interval: e.interval,
  })
})

/**
 * The OrientationInput class represents a stateless
 * interface for capturing device orientation from WebVR
 * or using devie Euler angles.
 *
 * @public
 * @class OrientationInput
 * @extends Command
 * @see Command
 */

export class OrientationInput extends Command {

  /**
   * OrientationInput class constructor.
   *
   * @public
   * @constructor
   * @param {Context} ctx Axis3D context object.
   * @param {?Object} opts Constructor options.
   */

  constructor(ctx, {} = {}) {
    registerStat('OrienationInput')

    super(update)

    /**
     * Quaternion representing the current device orienation.
     */

    const deviceRotation = new Quaternion()

    /**
     * Euler angles representing the current device orienation.
     */

    const deviceEuler = new Euler()

    /**
     * VRFrameData instance representing orientation state
     * emitted by the device (mobile, VR, etc).
     * webvr-polyfill ensures VRFrameData exists and is readblae.
     */

    const vrFrameData = new VRFrameData()

    /**
     * An array of VRDisplay
     */

    const vrDisplays = []

    /**
     * Handles VR displays when available.
     */

    function onvrdisplays(displays) {
      Object.assign(vrDisplays, displays)
    }

    // fetch vr displays
    void navigator
      .getVRDisplays()
      .then(onvrdisplays)
      .catch((err) => { ctx.emit('error', err) })

    /**
     * Orienation command update function.
     */

    function update(state, block) {
      // ensure correct values
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      // ensure object
      state = 'object' == typeof state && state ? state : {}

      // ensure function
      block = 'function' == typeof block ? block : function() {}

      computeDeviceRotationFromVRFrameData()
      // @TODO - computeDeviceRotationFromDeviceEuler()

      block({ ...globalState, deviceRotation, deviceEuler })
    }

    /**
     * Computes device rotation data from a vr display
     */

    function computeDeviceRotationFromVRFrameData() {
      if (vrDisplays.length) {
        vrDisplays[0].getFrameData(vrFrameData)
        deviceRotation.set(
          ...(vrFrameData.pose.orientation || [0, 0, 0, 1])
        )
        deviceEuler.set(...Euler.fromQuaternion(deviceRotation))
      }
    }
  }
}
