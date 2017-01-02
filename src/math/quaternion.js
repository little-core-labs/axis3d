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
