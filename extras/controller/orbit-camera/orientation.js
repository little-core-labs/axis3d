'use strict'

/**
 * Module dependencies.
 */

import { radians } from 'axis3d/utils'
import quat from 'gl-quat'

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
