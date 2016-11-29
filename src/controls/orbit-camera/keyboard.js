'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../utils'

/**
 * Applies orientation changes to orbit orbitCamera from
 * keyboard input
 *
 * @param {OrbitorbitCameraController} orbitCamera
 * @param {KeyboardCommand} keyboard
 */

export default (orbitCamera, {keyboard}, opts = {}, {dx = 0, dy = 0} = {}) => {
  keyboard && keyboard(() => {
    const friction = orbitCamera.friction
    let c = 0.05
    const step = c*friction

    // @TODO(werle) - should we reset keyboard state ?
    if (keyboard.aliasMappings.value('control')) {
      return
    }

    if (keyboard.aliasMappings.value('up')) {
      dx = dx + step
      orbitCamera.orientation.x -= step
      keyboard.aliasMappings.off('down')
    } else if (keyboard.aliasMappings.value('down')) {
      dx = dx - step
      orbitCamera.orientation.x += step
      keyboard.aliasMappings.off('up')
    }

    if (keyboard.aliasMappings.value('left')) {
      dy = dy + step
      orbitCamera.orientation.y -= step
      keyboard.aliasMappings.off('right')
    } else if (keyboard.aliasMappings.value('right')) {
      dy = dy - step
      orbitCamera.orientation.y += step
      keyboard.aliasMappings.off('left')
    }

    c = 0.25
    dx *= c
    dy *= c

    if (dx) { orbitCamera.orientation.x += dx }
    if (dy) { orbitCamera.orientation.y += dy }
  })
}
