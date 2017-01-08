'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

import { AbstractControllerCommand } from '../abstract-controller'
import { computeQuaternion } from 'axis3d/math/euler'
import { computeEuler } from 'axis3d/math/quaternion'
import { radians } from 'axis3d/utils'

// inputs
import applyOrientationInput from './orientation'
import applyKeyboardInput from './keyboard'
import applyMouseInput from './mouse'
import applyTouchInput from './touch'

import {
  Quaternion,
  Vector,
} from 'axis3d/math'

function clampQuaternion(q, min, max) {
  const euler = computeEuler(q)
  euler[0] = clamp(euler[0], min, max)
  euler[1] = clamp(euler[1], min, max)
  euler[2] = clamp(euler[2], min, max)
  return quat.copy(q, computeQuaternion(euler))
}

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
    const xyRotation = new Quaternion()
    const orientationRotation = new Quaternion()
    const initialRotation = new Quaternion(...(initial.rotation || []))

    position.set(...(initialPosition || []))

    super(ctx, {
      ...initial, update(updates, block) {
        let {
          interpolationFactor = initialInterpolationFactor,
          clampX: wantsClampX = initialClampX,
          rotation: offsetRotation = [0, 0, 0, 1],
          camera = initialCamera,
          euler = initialEuler,

          damping = initial.damping || DEFAULT_DAMPING,
          inputs = initialInputs,
          invert = initial.invert,
          zoom = initial.zoom || true,
          fov,

          orientation,
        } = updates

        damping = clamp(damping, 0, 1)

        // read current camera state
        camera(({
          position: currentPosition,
          fov: currentFov,
        }) => {
          if (null == initialPosition) {
            initialPosition = currentPosition
            vec3.copy(position, initialPosition)
          }
          fov = currentFov
        })

        // coerce zoom into something useable
        if (zoom && true === zoom.fov) {
          zoom.fov = fov
        } else if (zoom && 'number' != typeof zoom.fov) {
          delete zoom.fov
        }

        // supported controller inputs
        const {
          orientation: orientationInput,
          keyboard: keyboardInput,
          mouse: mouseInput,
          touch: touchInput,
        } = inputs

        // input state given to controller inputs
        const state = {
          orientationInput,
          keyboardInput,
          mouseInput,
          touchInput,

          orientation,
          position,
          euler,

          interpolationFactor,
          damping,
          camera,
          zoom,
        }

        if (orientationInput) {
          applyOrientationInput({ ...state})
        }

        // inputs that require focus to have change
        if (ctx.hasFocus) {
          if (keyboardInput) { applyKeyboardInput({ ...state }) }
          if (mouseInput) { applyMouseInput({ ...state }) }
          if (touchInput) { applyTouchInput({ ...state }) }
          // @TODO(werle) - joystick/gamepad
        }

        const conjugate = (q) => quat.conjugate([], q)
        const multiply = (...args) => quat.multiply([], ...args)

        const q0 = conjugate(orientation)
        const e0 = computeEuler(q0)
        const q1 = conjugate(q0)
        const qy = offsetRotation

        if (false != wantsClampX) {
          const min = clamp((-0.49*Math.PI)-e0[0], -0.98*Math.PI, 0)
          const max = clamp(0.49*Math.PI-e0[0], 0.98*Math.PI, 0)
          euler[0] = clamp(euler[0], min, max)
        }

        const ex = quat.setAxisAngle([], [1, 0, 0], euler[0])
        const ey = quat.setAxisAngle([], [0, 1, 0], euler[1])

        quat.slerp(
          xyRotation,
          xyRotation,
          multiply(ex, ey),
          interpolationFactor)

        quat.copy(
          rotation,
          multiply(q0, xyRotation))

        // clamp fov if fov zoom requested
        if (zoom && zoom.fov) {
          fov = clamp(zoom.fov, radians(1.1) , radians(120))
        }

        camera({ ...updates, position, rotation, fov }, () => {
          block()
        })
      }
    })
  }
}
