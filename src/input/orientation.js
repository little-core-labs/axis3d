'use strict'

/**
 * Module dependencies.
 */

import 'webvr-polyfill'
import { registerStat } from '../stats'
import { Command } from '../command'
import events from 'dom-events'
import quat from 'gl-quat'
import raf from 'raf'

import { computeQuaternion } from '../math/euler'
import { computeEuler } from '../math/quaternion'
import {
  Quaternion,
  Vector,
  Euler,
} from '../math'

import {
  getScreenOrientation,
  radians,
} from '../utils'

// VRFRameData
const vrFrameData = new VRFrameData()
const vrDisplays = []
navigator.getVRDisplays()
.then((displays) => {
  Object.assign(vrDisplays, displays)
})
.catch((err) => {
  console.error(err.stack || err)
})

// Global orientation state object.
const globalState = {
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

module.exports = exports = (...args) => new OrientationInputCommand(...args)
export class OrientationInputCommand extends Command {
  constructor(ctx, {} = {}) {
    registerStat('OrienationInput')

    let preferDeviceRotation = false
    const deviceRotation = new Quaternion()
    const deviceEuler = new Euler()

    super((state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      const isEmulated = (
        vrDisplays.length &&
        /emulated/i.test(vrDisplays[0].displayName)
      )

      state = state || {}
      block = block || function() {}

      if (isEmulated) {
        computeDeviceRotation()
      } else {
        computeDeviceRotationFromVRFrameData()
      }

      block({
        ...globalState,
        deviceRotation,
        deviceEuler,
      })
    })

    function computeDeviceRotationFromVRFrameData() {
      if (vrDisplays.length) {
        vrDisplays[0].getFrameData(vrFrameData)
        deviceRotation.set(
          ...(vrFrameData.pose.orientation || [0, 0, 0, 1])
        )
        deviceEuler.set(...computeEuler(deviceRotation))
      }
    }

    const r22 = Math.sqrt(0.5)
    const world = quat.fromValues(-r22, 0, 0, r22)

    function computeDeviceRotation() {
      const {
        currentAlpha: alpha,
        currentBeta: beta,
        currentGamma: gamma,
      } = globalState

      const angle = getScreenOrientation()

      deviceEuler.set(
        radians(beta),
        radians(alpha),
        radians(-gamma))

      quat.copy(
        deviceRotation,
        computeQuaternion(deviceEuler, 'yxz'))

      quat.multiply(
        deviceRotation,
        deviceRotation,
        [0, Math.sin(-0.5*angle), 0, Math.cos(-0.5*angle)])

      quat.multiply(
        deviceRotation,
        deviceRotation,
        world)
    }
  }
}
