'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'

module.exports = ({
  mouseInput: mouse,
  position,
  damping,
  invert = false,
  euler,
  zoom = true,
} = {}) => {
  // update orientation from coordinates
  mouse && mouse(({
    buttons,
    deltaX: dx,
    deltaY: dy,
  }) => {
    // update if a singled button is pressed
    if (1 == buttons && (dy || dx)) {
      const xValue = (false == invert ? 1 : -1)*0.0025*dy*damping
      const yValue = (false == invert ? 1 : -1)*0.0045*dx*damping
      euler[0] += xValue
      euler[1] += yValue
    }
  })

  // update field of view from mouse wheel
  mouse && mouse(({wheel}) => {
    const c = 0.033
    const dv = c*damping*wheel.deltaY
    if (zoom && 'number' == typeof zoom.fov) {
      zoom.fov = (zoom.fov || 0) + dv
    } else if (false !== zoom) {
      position[2] = clamp(position[2] + dv, 0, Infinity)
    }
  })
}
