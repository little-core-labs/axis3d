'use strict'

/**
 * Module dependencies.
 */

import { Quaternion } from '../math'
import { Command } from '../command'
import events from 'dom-events'
import quat from 'gl-quat'
import raf from 'raf'

import {
  getScreenOrientation,
  radians,
  define,
} from '../utils'

//
// Global orientation state object.
//
const globalState = {
  hasDeviceOrientation: false,
  absolute: null,

  currentAlpha: 0, // z
  currentBeta: 0, // x
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

  if (alpha && beta && gamma) {
    global.hasDeviceOrientation = true
  }

  if (false == global.hasDeviceOrientation) {
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

/**
 * Orientation function.
 *
 * @see OrientationCommand
 */

module.exports = exports = (...args) => new OrientationCommand(...args)

/**
 * OrientationCommand class
 *
 * @public
 * @class OrientationCommand
 * @extends Command
 */

export class OrientationCommand extends Command {

  /**
   * OrientationCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} [opts]
   */

  constructor(ctx, {
  } = {}) {
    const deviceOrientation = new Quaternion()
    const screenTransform = new Quaternion()
    const deviceRotation = new Quaternion()

    super((_, state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      computeDeviceRotation()

      const {
        absolute = null,
        currentAlpha = 0,
        currentBeta = 0,
        currentGamma = 0,
        deltaAlpha = 0,
        deltaBeta = 0,
        deltaGamma = 0,
        prevAlpha = 0,
        prevBeta = 0,
        prevGamma = 0,
      } = globalState

      block({
        absolute,
        currentAlpha,
        currentBeta,
        currentGamma,
        deltaAlpha,
        deltaBeta,
        deltaGamma,
        prevAlpha,
        prevBeta,
        prevGamma,
        rotation: deviceRotation,
      })
    })

    function computeDeviceRotation() {
      // borrowed from https://github.com/hawksley/eleVR-Web-Player/blob/master/js/phonevr.js
      const {
        currentAlpha,
        currentBeta,
        currentGamma
      } = globalState

      const screenOrientation = 0.5*radians(getScreenOrientation())
      const z = 0.5*radians(currentAlpha)
      const x = 0.5*radians(currentBeta)
      const y = 0.5*radians(currentGamma)
      const cX = Math.cos(x)
      const cY = Math.cos(y)
      const cZ = Math.cos(z)
      const sX = Math.sin(x)
      const sY = Math.sin(y)
      const sZ = Math.sin(z)

      deviceOrientation.set(
        (cX * cY * cZ - sX * sY * sZ),
        (sX * cY * cZ - cX * sY * sZ),
        (cX * sY * cZ + sX * cY * sZ),
        (cX * cY * sZ + sX * sY * cZ)
      )

      screenTransform.set(
        0,
        0,
        -Math.sin(screenTransform),
        Math.cos(screenTransform)
      )

      quat.multiply(
        deviceRotation,
        deviceOrientation,
        screenTransform)

      // @see https://github.com/hawksley/eleVR-Web-Player/blob/master/js/phonevr.js#L53
      const r22 = Math.sqrt(0.5);
      quat.multiply(
        deviceRotation,
        quat.fromValues(-r22, 0, 0, r22),
        deviceRotation);
    }
 }
}
