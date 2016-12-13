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

export const DEFAULT_FRICTION = 0.68

/**
 * OrbitCameraController function.
 *
 * @see OrbitCameraController
 */

module.exports = exports = (...args) => new OrbitCameraController(...args)

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
    let {
      camera,
      inputs = {},
      position = [...camera.position],
    } = opts
    super(ctx, {
      ...opts,
      update({
        interpolationFactor,
        orientation,
        rotation = camera.rotation,
        position: newPosition = null,
        friction = opts.friction || DEFAULT_FRICTION,
        target = camera.target,
        invert = opts.invert,
        scale = camera.scale,
        zoom = opts.zoom || true,
      } = {}, block) {
        if (zoom && true === zoom.fov) {
          zoom.fov = camera.fov
        } else if (zoom && 'number' != typeof zoom.fov) {
          delete zoom.fov
        }

        if (newPosition) {
          vec3.copy(position, newPosition)
        }

        if (ctx.hasFocus) {
          // supported inputs
          const {
            orientation: orientationInput,
            keyboard: keyboardInput,
            mouse: mouseInput,
            touch: touchInput,
          } = inputs

          friction = clamp(friction, 0, 1)

          keyboardInput && applyKeyboardInput({
            keyboardInput,
            orientation,
            friction,
          })

          mouseInput && applyMouseInput({
            orientation,
            mouseInput,
            position,
            friction,
            invert,
            camera,
            zoom,
          })

          touchInput && applyTouchInput({
            orientation,
            touchInput,
            friction,
            invert,
            camera,
            zoom,
          })

          // @TODO(werle) -
          // * device orientation
          // * webvr
          // * joystick
        }

        let fov = camera.fov
        if (zoom && zoom.fov) {
          fov = clamp(zoom.fov, radians(1.1) , radians(120))
        }
        // clamp at north/south poles
        orientation[0] = clamp(orientation[0], radians(-90), radians(90))
        camera({fov, rotation, position, target}, () => {
          block()
        })
      }
    })
  }
}
