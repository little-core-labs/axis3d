'use strict'

/**
 * Module dependencies.
 */

import { computeQuaternion } from './euler'
import ThreeEuler from 'math-euler'
import { Vector } from './vector'
import coalesce from 'defined'
import clamp from 'clamp'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'

export class Quaternion extends Vector {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(coalesce(x, 0),
          coalesce(y, 0),
          coalesce(z, 0),
          coalesce(w, 1))
  }
}

/**
 *
 */

export function clampQuaternion(q, min, max) {
  const euler = computeEuler(q)
  euler[0] = clamp(euler[0], min, max)
  euler[1] = clamp(euler[1], min, max)
  euler[2] = clamp(euler[2], min, max)
  return quat.copy(q, computeQuaternion(euler))
}

export function clampQuaternionAroundXAxis(q, min, max) {
  let x = q[0], y = q[1], z = q[2], w = q[3]
  x = x/w
  y = y/w
  z = z/w
  w = 1
  let angle = clamp(2*(Math.PI/180)*Math.atan(x), min, max)
  x = Math.tan(0.5*angle*(Math.PI/180))
  q[0] = x
  q[1] = y
  q[2] = z
  q[3] = w
  return q
}

/**
 * Helper function to compute euler angles from
 * a given quaternion.
 */

export function computeEuler(q, order = 'xyz') {
  const euler = new ThreeEuler()
  euler.setFromRotationMatrix({
    elements: mat4.fromQuat([], q)
  }, order.toUpperCase())
  return [euler.x, euler.y, euler.z]
}
