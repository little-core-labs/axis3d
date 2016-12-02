'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../utils'
import clamp from 'clamp'

/**
 * Applies touch changes to orbit orbitCamera from
 * touch input
 *
 * @param {Object} opts
 * @param {OrbitCameraController} opts.camera
 * @param {TouchCommand} opts.touch
 * @param {Object} opts.state
 */

module.exports = exports = ({
  camera,
  touch,
  state,
} = {}) => {
  // update orientation from touch input
  touch && touch(() => {
    const friction = camera.friction
    const dx = touch.deltaX
    const dy = touch.deltaY
    const c = 0.075

    if (touch.touches && touch.touches.length) {
      camera.orientation.x -= c*dy*friction
      camera.orientation.y -= c*dx*friction
    }
  })
}
