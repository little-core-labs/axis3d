'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'

/**
 * Local friction applied to rotations around
 * the x axis for mouse inputs.
 */

const X_AXIS_MOUSE_FRICTION = 0.005

/**
 * Local friction applied to rotations around
 * the y axis for mouse inputs.
 */

const Y_AXIS_MOUSE_FRICTION = 0.006

/**
 * Applies orientation changes to orbit orbitCamera from
 * mouse input
 *
 */

module.exports = exports = ({
  mouseInput: mouse,
  orientation,
  position,
  friction,
  invert = false,
  zoom = true,
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
    if (zoom && 'number' == typeof zoom.fov) {
      zoom.fov = (zoom.fov || 0) + dv
    } else if (false !== zoom) {
      position[2] = clamp(position[2] + dv, 0, Infinity)
    }
  })
}
