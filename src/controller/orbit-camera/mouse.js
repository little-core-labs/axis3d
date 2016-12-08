'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'

/**
 * Local friction applied to rotations around
 * the x axis for mouse inputs.
 */

const X_AXIS_MOUSE_FRICTION = 0.0033

/**
 * Local friction applied to rotations around
 * the y axis for mouse inputs.
 */

const Y_AXIS_MOUSE_FRICTION = 0.004

/**
 * Applies orientation changes to orbit orbitCamera from
 * mouse input
 *
 */

module.exports = exports = ({
  mouseInput: mouse,
  orientation,
  friction,
  camera,
  invert = false,
  zoom = {fov: false},
} = {}) => {
  // update orientation from coordinates
  mouse && mouse(({
    buttons,
    deltaX: dx,
    deltaY: dy,
  }) => {
    const xf = 0.001
    const yf = 0.0012

    // update if a singled button is pressed
    if (1 == buttons && (dy || dx)) {
      orientation[0] += ((false == invert ? 1 : -1)*xf*dy)/(friction || 0.01)
      orientation[1] += ((false == invert ? 1 : -1)*yf*dx)/(friction || 0.01)
    }
  })

  // update field of view from mouse wheel
  mouse && mouse(({wheel}) => {
    const c = 0.033
    const dv = c*friction*wheel.deltaY
    if (zoom && zoom.fov) {
      camera({
        fov: (camera.fov || 0) + dv
      })
    } else if (false !== zoom) {
      camera({
        position: [
          camera.position.x,
          camera.position.y,
          clamp(camera.position.z + dv, 0, Infinity)
        ]
      })
    }
  })
}
