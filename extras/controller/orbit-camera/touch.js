'use strict'

/**
 * Module dependencies.
 */

import { radians } from 'axis3d/utils'
import clamp from 'clamp'
import quat from 'gl-quat'

module.exports = ({
  touchInput: touch,
  damping,
  invert = false,
  euler,
} = {}) => {
  touch(({
    hasTouch,
    deltaX: dx,
    deltaY: dy,
  }) => {
    if (hasTouch) {
      const xValue = (false == invert ? -1 : 1)*0.004*dy*damping
      const yValue = (false == invert ? -1 : 1)*0.0055*dx*damping
      euler[0] += xValue
      euler[1] += yValue
    }
  })
}
