'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector3, Euler} from '../../../src/math'
import { radians } from '../../../src/utils'

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
      maxEuler = [Infinity, Infinity],
      minEuler = [-Infinity, -Infinity],
      euler: initialEuler = [0, 0, 0],
      camera: initialCamera,
      inputs: initialInputs = {},
      clampX: initialClampX = true,
      position: initialPosition = null,
      interpolationFactor: initialInterpolationFactor = 1,
    } = initial

    const direction = new Vector3()
    const worldUp = new Vector3(0, 1, 0)
    const right = new Vector3()
    const up = new Vector3()

    const position = new Vector3()
    const rotation = new Quaternion()
    const target = new Vector3()
    const x = new Quaternion()
    const y = new Quaternion()

    let offset = new Vector3()
    let fov = 0

    position.set(...(initialPosition || []))

    // read current camera state
    initialCamera(({
      position: currentPosition,
      target: currentTarget,
      fov: initialFov
    }) => {
      if (null == initialPosition) {
        initialPosition = currentPosition
        vec3.copy(position, initialPosition)
      }
      vec3.copy(target, currentTarget)
      fov = initialFov
    })

    super(ctx, {
      ...initial, update(args, block) {
        let {
          interpolationFactor = initialInterpolationFactor,
          damping = initial.damping || DEFAULT_DAMPING,
          camera = initialCamera,
          inputs = initialInputs,
          euler = initialEuler,
          zoom = initial.zoom || true,
        } = args

        damping = clamp(damping, 0, 1)

        if ('position' in args) { vec3.copy(position, args.position) }
        if ('target' in args) { vec3.copy(target, args.target) }
        if ('fov' in args) { fov = args.fov }

        // coerce zoom into something useable
        if (zoom && true === zoom.fov) {
          zoom.fov = fov
        } else if (zoom && 'number' != typeof zoom.fov) {
          delete zoom.fov
        }

        const {
          keyboard: keyboardInput,
          mouse: mouseInput,
          touch: touchInput,
        } = inputs

        // input state given to controller inputs
        const state = {
          ...initial,
          ...args,
          interpolationFactor,
          keyboardInput,
          mouseInput,
          touchInput,
          position,
          damping,
          camera,
          offset,
          target,
          euler,
          zoom,
        }

        // inputs that require focus to have change
        if (ctx.hasFocus) {
          if (keyboardInput) { applyKeyboardInput({ ...state }) }
          if (mouseInput) { applyMouseInput({ ...state }) }
          if (touchInput) { applyTouchInput({ ...state }) }
        }

        vec3.cross(up, direction, [0, 1, 0])
        vec3.cross(up, up, direction)
        vec3.cross(right, direction, up)

        const multiply = (a, b) => quat.multiply([], a, b)
        const angle = (a, x) => quat.setAxisAngle([], a, x)

        euler[0] = clamp(euler[0], minEuler[0], maxEuler[0])
        euler[1] = clamp(euler[1], minEuler[1], maxEuler[1])

        quat.slerp(x, x, angle(right, euler[0]), clamp(0.5+interpolationFactor, 0, 1));
        quat.slerp(y, y, angle(worldUp, euler[1]), interpolationFactor)
        quat.slerp(rotation, rotation, multiply(x, y), interpolationFactor)

        // clamp fov if fov zoom requested
        if (zoom && zoom.fov) {
          fov = clamp(zoom.fov, radians(1.1) , radians(120))
        }

        const lerp = (a, b, t) => vec3.lerp([], a, b, t)
        const add = (a, b) => vec3.add([], a, b)

        camera({
          ...args,
          position: lerp(position, add(position, offset), interpolationFactor),
          rotation,
          target,
          fov
        }, function({
          direction: currentDirection,
          position: currentPosition,
          target: currentTarget,
          fov: currentFov,
          up: currentUp
        }) {
          vec3.copy(direction, currentDirection)
          vec3.copy(position, currentPosition)
          vec3.copy(target, currentTarget)
          vec3.copy(up, currentUp)
          fov = currentFov
          block(...arguments)
        })
      }
    })
  }
}
