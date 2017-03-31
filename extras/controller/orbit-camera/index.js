'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from 'axis3d/math'
import { radians } from 'axis3d/utils'

// inputs
import { AbstractControllerCommand } from '../abstract-controller'
import applyKeyboardInput from './keyboard'
import applyMouseInput from './mouse'
import applyTouchInput from './touch'

import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

module.exports = exports = (...args) => new OrbitCameraController(...args)

// damping value applied to various inputs
// to get an intuitive value that is useful for
// computing a axis rotation expressed in radians
export const DEFAULT_DAMPING = 0.8

export class OrbitCameraController extends AbstractControllerCommand {
  constructor(ctx, initial = {}) {
    let {
      euler: initialEuler = [0, 0, 0],
      camera: initialCamera,
      inputs: initialInputs = {},
      clampX: initialClampX = true,
      position: initialPosition = null,
      interpolationFactor: initialInterpolationFactor = 1,
    } = initial

    const position = new Vector(0, 0, 0)
    const rotation = new Quaternion()
    const x = new Quaternion()
    const y = new Quaternion()

    position.set(...(initialPosition || []))

    super(ctx, {
      ...initial, update(updates, block) {
        let {
          interpolationFactor = initialInterpolationFactor,
          camera = initialCamera,
          euler = initialEuler,

          damping = initial.damping || DEFAULT_DAMPING,
          inputs = initialInputs,
          zoom = initial.zoom || true,
          fov,

        } = updates

        // read current camera state
        camera(({ position: currentPosition, fov: currentFov, }) => {
          if (null == initialPosition) {
            initialPosition = currentPosition
            if ('position' in updates) {
              vec3.copy(position, updates.position)
            } else {
              vec3.copy(position, initialPosition)
            }
          }
          fov = currentFov
        })

        // coerce zoom into something useable
        if (zoom && true === zoom.fov) {
          zoom.fov = fov
        } else if (zoom && 'number' != typeof zoom.fov) {
          delete zoom.fov
        }

        // clamp damping value
        damping = clamp(damping, 0, 1)

        // supported controller inputs
        const {
          keyboard: keyboardInput,
          mouse: mouseInput,
          touch: touchInput,
        } = inputs

        // input state given to controller inputs
        const state = {
          invert: false,

          ...updates,
          keyboardInput,
          mouseInput,
          touchInput,

          position,
          euler,

          interpolationFactor,
          damping,
          camera,
          zoom,
        }

        // inputs that require focus to have change
        if (ctx.hasFocus) {
          if (keyboardInput) { applyKeyboardInput({ ...state }) }
          if (mouseInput) { applyMouseInput({ ...state }) }
          if (touchInput) { applyTouchInput({ ...state }) }
        }

        euler[0] = clamp(euler[0], -0.49*Math.PI, 0.49*Math.PI)

        quat.setAxisAngle(x, [1, 0, 0], euler[0] * interpolationFactor)
        quat.setAxisAngle(y, [0, 1, 0], euler[1])

        quat.slerp(rotation, rotation, y, interpolationFactor)
        quat.multiply(rotation, x, rotation)

        // clamp fov if fov zoom requested
        if (zoom && zoom.fov) {
          fov = clamp(zoom.fov, radians(1.1) , radians(120))
        }

        camera({ ...updates, position, rotation, fov }, block)
      }
    })
  }
}
