'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

import { AbstractControllerCommand } from '../abstract-controller'
import applyOrientationInput from './orientation'
import applyKeyboardInput from './keyboard'
import { lerp, radians } from '../../utils'
import applyMouseInput from './mouse'
import applyTouchInput from './touch'

/**
 * OrbitCameraController function.
 *
 * @see OrbitCameraController
 */

module.exports = exports = (...args) => new OrbitCameraController(...args)

/**
 * Default friction value applied to inputs.
 *
 * @public
 * @const
 * @type {Number}
 */

export const DEFAULT_FRICTION = 0.68

/**
 * OrbitCameraController class
 *
 * @public
 * @class OrbitCameraController
 * @extends AbstractControllerCommand
 */

export class OrbitCameraController extends AbstractControllerCommand {

  /**
   * OrbitCameraController class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    let { inputs = {} } = opts
    super(ctx, {
      ...opts,
      update({
        interpolationFactor,
        orientation,
        friction = opts.friction || DEFAULT_FRICTION,
        invert = opts.invert,
        target: camera,
        zoom = opts.zoom,
      } = {}, block) {
        // clamp friction coef to 0 <= f <= 1
        friction = clamp(friction, 0, 1)

        // apply inputs if context has focus,
        // but fall through and update camera regardless
        // so interpolated values are still set as time
        // moves forward
        if (ctx.hasFocus) {
          // supported inputs
          const {
            orientation: orientationInput,
            keyboard: keyboardInput,
            mouse: mouseInput,
            touch: touchInput,
          } = inputs

          keyboardInput && applyKeyboardInput({
            keyboardInput,
            orientation,
            friction,
          })

          mouseInput && applyMouseInput({
            orientation,
            mouseInput,
            friction,
            invert,
            camera,
            zoom,
          })

          // @TODO(werle) -
          // * device orientation
          // * touch
          // * webvr
          // * joystick
        }

        const fov = clamp(camera.fov, radians(1.1) , radians(120))
        // clamp at north/south poles
        orientation[0] = clamp(orientation[0], radians(-90), radians(90))
        camera({fov})
        block()
      }
    })
  }
}
