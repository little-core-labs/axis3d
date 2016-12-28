'use strict'

/**
 * Module dependencies.
 */

import { radians } from 'axis3d/utils'
import quat from 'gl-quat'

/**
 * Applies orientation changes to orbit orbitCamera from
 * keyboard input
 */

module.exports = exports = ({
  interpolationFactor,
  keyboardInput: keyboard,
  damping,
  euler
} = {}) => {
  keyboard && keyboard(({mappings}) => {
    const step = 0.08*damping

    // @TODO(werle) - should we reset keyboard state ?
    if (mappings.value('control')) {
      return
    }

    if (mappings.value('up')) {
      mappings.off('down')
      euler[0] -= 0.9*step
    } else if (mappings.value('down')) {
      mappings.off('up')
      euler[0] += 0.9*step
    }

    if (mappings.value('left')) {
      mappings.off('right')
      euler[1] -= step
    } else if (mappings.value('right')) {
      mappings.off('left')
      euler[1] += step
    }
  })
}
