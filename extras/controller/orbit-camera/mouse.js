'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'

module.exports = ({
  mouseInput: mouse,
  zoomDamping = 1,
  position,
  damping,
  invert = false,
  offset,
  euler,
  zoom = true,
} = {}) => {
  // update orientation from coordinates
  mouse && mouse(({buttons, deltaX, deltaY}) => {
    // update if a singled button is pressed
    if (1 == buttons && (deltaY || deltaX)) {
      const xValue = (false == invert ? -1 : 1)*0.005*deltaY*damping
      const yValue = (false == invert ? -1 : 1)*0.0075*deltaX*damping
      euler[0] += xValue
      euler[1] += yValue
    }
  })

  // update field of view from mouse wheel
  mouse && mouse(({wheel}) => {
    const dv = 0.1*zoomDamping*damping*wheel.deltaY
    if (zoom && 'number' == typeof zoom.fov) {
      zoom.fov = (zoom.fov || 0) + dv
    } else if (false !== zoom) {
      offset.z = clamp(offset.z + dv, 0, Infinity)
    }
  })
}
