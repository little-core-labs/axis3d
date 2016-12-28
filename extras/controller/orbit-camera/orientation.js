'use strict'

/**
 * Module dependencies.
 */

import { radians } from 'axis3d/utils'
import quat from 'gl-quat'

/**
 * Applies orientation changes to OrbitCameraController from
 * orientation input
 */

module.exports = exports = ({
  orientationInput,
  orientation
} = {}) => {
  orientationInput && orientationInput(({
    hasDeviceOrientation,
    deviceRotation,
  } = {}) => {
    if (false == hasDeviceOrientation) {
      return
    }

    quat.copy(orientation, deviceRotation)
  })
}
