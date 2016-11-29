'use strict'

/**
 * Module dependencies.
 */


/**
 * Local friction applied to rotations around
 * the x axis for mouse inputs.
 */

const X_AXIS_MOUSE_FRICTION = 0.005

/**
 * Local friction applied to rotations around
 * the y axis for mouse inputs.
 */

const Y_AXIS_MOUSE_FRICTION = 0.004

/**
 * Applies orientation changes to orbit orbitCamera from
 * mouse input
 *
 * @param {Object} opts
 * @param {OrbitCameraController} opts.camera
 * @param {MouseCommand} opts.mouse
 * @param {Object} opts.state
 */

export default ({
  camera,
  mouse,
  state,
} = {}) => {
  const friction = camera.friction
  const invert = state.invert || false
  const zoom = state.zoom || {fov: false}

  // update orientation from coordinates
  mouse && mouse(() => {
    const xf = X_AXIS_MOUSE_FRICTION
    const yf = Y_AXIS_MOUSE_FRICTION
    const dy = mouse.deltaY
    const dx = mouse.deltaX

    // update if a singled button is pressed
    if (1 == mouse.buttons && (dy || dx)) {
      camera.orientation.x += (false == invert ? 1 : -1)*xf*dy*friction
      camera.orientation.y += (false == invert ? 1 : -1)*yf*dx*friction
    }
  })

  // update field of view from mouse wheel
  mouse && mouse(() => {
    const c = 0.033
    const dv = c*friction*mouse.wheel.deltaY
    if (zoom && zoom.fov) {
      if (!camera.fov) { camera.fov = 0 }
      camera.target.fov += dv
    } else if (false !== zoom) {
      camera.target.position.z += dv
    }
  })
}
