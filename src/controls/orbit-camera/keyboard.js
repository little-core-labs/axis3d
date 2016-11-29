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

export default ({
  keyboard,
  camera,
  state,
} = {}) => {
  keyboard && keyboard(() => {
    let c = 0.125
    let dx = 0
    let dy = 0
    const friction = camera.friction
    const step = c*friction

    // @TODO(werle) - should we reset keyboard state ?
    if (keyboard.aliasMappings.value('control')) {
      return
    }

    if (keyboard.aliasMappings.value('up')) {
      dx = dx + step
      camera.orientation.x -= step
      keyboard.aliasMappings.off('down')
    } else if (keyboard.aliasMappings.value('down')) {
      dx = dx - step
      camera.orientation.x += step
      keyboard.aliasMappings.off('up')
    }

    if (keyboard.aliasMappings.value('left')) {
      dy = dy + step
      camera.orientation.y -= step
      keyboard.aliasMappings.off('right')
    } else if (keyboard.aliasMappings.value('right')) {
      dy = dy - step
      camera.orientation.y += step
      keyboard.aliasMappings.off('left')
    }

    c = 0.25
    dx *= c
    dy *= c

    if (dx) { camera.orientation.x += dx }
    if (dy) { camera.orientation.y += dy }
  })
}
