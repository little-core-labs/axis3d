'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../utils'

/**
 * Applies orientation changes to OrbitCameraController from
 * orientation input
 *
 * @param {Object} opts
 * @param {OrbitCameraController} opts.camera
 * @param {OrientationCommand} opts.orientation
 * @param {Object} opts.state
 */

export default ({
  orientation,
  camera,
  state,
} = {}) => {
  // update orientation from orientation input
  orientation && orientation(() => {
    const friction = camera.friction
    camera.orientation.x -= friction*radians(orientation.deltaBeta)
    camera.orientation.y -= friction*radians(orientation.deltaGamma)
    camera.orientation.z -= friction*radians(orientation.deltaAlpha)
  })
}
