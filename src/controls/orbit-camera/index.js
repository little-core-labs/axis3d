'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

import { ControllerCommand } from '../../controller'
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

export default (...args) => new OrbitCameraController(...args)

/**
 * Default friction value applied to inputs.
 *
 * @public
 * @const
 * @type {Number}
 */

export const DEFAULT_FRICTION = 0.8

/**
 * OrbitCameraController class
 *
 * @public
 * @class OrbitCameraController
 * @extends ControllerCommand
 */

export class OrbitCameraController extends ControllerCommand {

  /**
   * OrbitCameraController class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    super(ctx, { ...opts }, (_, updates, target) => {
      const interpolationFactor = this.interpolationFactor
      const friction = this.friction
      const camera = updates.target || this.target
      const inputs = this.inputs || {}

      if (true != opts.invert) {
        opts.invert = false
      }

      // supported inputs
      const orientation = inputs.orientation
      const keyboard = inputs.keyboard
      const mouse = inputs.mouse
      const touch = inputs.touch

      if (ctx.hasFocus) {
        if (orientation) { applyOrientationInput({camera: this, orientation, state: {...opts, ...updates}}) }
        if (keyboard) { applyKeyboardInput({camera: this, keyboard, state: {...opts, ...updates}}) }
        if (mouse) { applyMouseInput({camera: this, mouse, state: {...opts, ...updates}}) }
        if (touch) { applyTouchInput({camera: this, touch, state: {...opts, ...updates}}) }
      }

      // clamp at north/south poles
      this.orientation.x = clamp(this.orientation.x, radians(-89), radians(89))
      target.fov = clamp(target.fov, radians(0.1) , radians(120))
      quat.copy(camera.rotation, this.rotation)
    })

    /**
     * Orbit control inputs.
     *
     * @public
     * @type {Object}
     */

    this.inputs = Object.assign({}, opts.inputs || {})

    /**
     * Friction value applied to various inputs.
     *
     * @public
     * @type {Number}
     */

    this.friction = null != opts.friction ? opts.friction : DEFAULT_FRICTION
  }
}
