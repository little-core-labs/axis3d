'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../utils'
import clamp from 'clamp'

module.exports = exports = ({
  touchInput: touch,
  orientation,
  friction,
  camera,
  invert = false,
  zoom = {fov: false},
} = {}) => {
  touch(({
    touches,
    deltaX: dx,
    deltaY: dy,
  }) => {
    const z = 0.0028
    if (touches) {
      orientation[0] += ((false == invert ? 1 : -1)*(0.5*z)*dy)/(friction || 0.01)
      orientation[1] += ((false == invert ? 1 : -1)*z*dx)/(friction || 0.01)
    }
  })
}
