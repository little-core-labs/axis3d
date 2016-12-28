'use strict'

/**
 * Module dependencies.
 */

import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

import { AbstractControllerCommand } from '../abstract-controller'
import applyOrientationInput from './orientation'
import { computeQuaternion } from 'axis3d/math/euler'
import { computeEuler, clampQuaternion } from 'axis3d/math/quaternion'
import applyKeyboardInput from './keyboard'
import applyMouseInput from './mouse'
import applyTouchInput from './touch'
import { Quaternion } from 'axis3d/math'
import { radians } from 'axis3d/utils'

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
      position: initialPosition = [...(initial.camera || {}).position],
      interpolationFactor: initialInterpolationFactor = 1,
    } = initial

    const rotation = new Quaternion(...(initial.rotation || []))
    const xyRotation = new Quaternion()
    const orientationRotation = new Quaternion()

    super(ctx, {
      ...initial, update(updates, block) {
        let {
          interpolationFactor = initialInterpolationFactor,
          clampX: wantsClampX = initialClampX,
          position = initialPosition,
          rotation: offsetRotation = [0, 0, 0, 1],
          camera = initialCamera,
          euler = initialEuler,

          inputs = initialInputs,
          damping = initial.damping || DEFAULT_DAMPING,
          invert = initial.invert,
          zoom = initial.zoom || true,

          orientation,
          xAxisRotation,
          yAxisRotation,
          zAxisRotation,
        } = updates

        damping = clamp(damping, 0, 1)

        // coerce zoom into something useable
        if (zoom && true === zoom.fov) {
          zoom.fov = camera.fov
        } else if (zoom && 'number' != typeof zoom.fov) {
          delete zoom.fov
        }

        // clamp fov if fov zoom requested
        let fov = camera.fov
        if (zoom && zoom.fov) {
          fov = clamp(zoom.fov, radians(1.1) , radians(120))
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

          xAxisRotation,
          yAxisRotation,
          zAxisRotation,
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

        const q0 = quat.slerp(
          orientationRotation,
          orientationRotation,
          conjugate(orientation),
          0.89
        )

        const e0 = computeEuler(q0)
        const q1 = conjugate(q0)
        const qy = offsetRotation

        if (false != wantsClampX) {
          const min = clamp((-0.49*Math.PI)-e0[0], -0.98*Math.PI, 0)
          const max = clamp(-1*-0.49*Math.PI-e0[0], 0.98*Math.PI, 0)
          clampQuaternion(xAxisRotation, min, max)
          euler[0] = clamp(euler[0], min, max)
        }

        const rxy = multiply(xAxisRotation, yAxisRotation)
        const rxyz = multiply(rxy, zAxisRotation)

        const ex = quat.setAxisAngle([], [1, 0, 0], euler[0])
        const ey = quat.setAxisAngle([], [0, 1, 0], euler[1])

        quat.slerp(
          xyRotation,
          xyRotation,
          multiply(ex, ey),
          interpolationFactor
        )

        quat.copy(
          rotation,
          multiply(q0, multiply(multiply(q1, multiply(xyRotation, rxy)), q0))
        )

        camera({ ...updates, position, rotation}, () => {
          block()
        })
      }
    })
  }
}
