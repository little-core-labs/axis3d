'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../utils'

/**
 * Applies orientation changes to orbit orbitCamera from
 * keyboard input
 *
 * @param {Object} opts
 * @param {OrbitorbitCameraController} orbitCamera
 * @param {KeyboardCommand} keyboard
 */

module.exports = exports = ({
  keyboardInput: keyboard,
  orientation,
  friction,
} = {}) => {
  keyboard && keyboard(({mappings}) => {
    let dx = 0
    let dy = 0
    let c = 0.08
    const step = c*friction

    // @TODO(werle) - should we reset keyboard state ?
    if (mappings.value('control')) {
      return
    }

    if (mappings.value('up')) {
      dx = dx + step
      orientation[0] -= step
      mappings.off('down')
    } else if (mappings.value('down')) {
      dx = dx - step
      orientation[1] += step
      mappings.off('up')
    }

    if (mappings.value('left')) {
      dy = dy + step
      orientation[0] -= step
      mappings.off('right')
    } else if (mappings.value('right')) {
      dy = dy - step
      orientation[1] += step
      mappings.off('left')
    }

    c = 0.25
    dx *= c
    dy *= c

    if (dx) { orientation[0] += dx }
    if (dy) { orientation[1] += dy }
  })
}
