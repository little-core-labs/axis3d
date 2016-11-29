'use strict'

/**
 * Module dependencies.
 */

import coalesce from 'defined'
import clamp from 'clamp'
import quat from 'gl-quat'

import {
  Vector,
  XVector3,
  YVector3,
  ZVector3,
} from './vector'

const multiply = (...args) => quat.multiply([], ...args)
const slerp = (t, ...args) => quat.slerp(t, t, ...args)
const copy = quat.copy
const set = (...args) => quat.setAxisAngle(...args)

/**
 * Quaternion class.
 *
 * @public
 * @class Quaternion
 * @extends Vector
 */

export class Quaternion extends Vector {

  /**
   * Quaternion class constructor.
   *
   * @public
   * @constructor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   */

  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(coalesce(x, 0),
          coalesce(y, 0),
          coalesce(z, 0),
          coalesce(w, 1))
  }

  /**
   * Rotates target at given orientation euler angles
   * in XYZ order with a given interpolation factor
   * used for slerp.
   *
   * @public
   * @param {Quaternion} target
   * @param {Object} angles
   * @param {Number} interpolationFactor
   */

  static slerpTargetFromAxisAngles(target,
                                   angles,
                                   interpolationFactor = 0.1) {
    const vx = XVector3, vy = YVector3, vz = ZVector3
    const ax = angles.x, ay = angles.y, az = angles.z
    const x = _scratchX, y = _scratchY, z = _scratchZ

    const f = clamp(interpolationFactor, 0, 1)
    const t = target

    set(x, vx, ax)
    set(y, vy, ay)
    set(z, vz, az)

    // t' = slerp(t, x * y * z, f)
    slerp(t, multiply(multiply(x, y), z), f)
  }

  /**
   * Rotates target at given orientation euler angles
   * in XYZ order with a given interpolation factor
   * used for slerp and also applied to the
   * angle expressed on the X axis.
   *
   * @public
   * @param {Quaternion} target
   * @param {Object} angles
   * @param {Number} interpolationFactor
   */

  static sloppySlerpTargetFromAxisAngles(target, angles, interpolationFactor = 0.1) {
    const vx = XVector3, vy = YVector3, vz = ZVector3
    const ax = angles.x, ay = angles.y, az = angles.z
    const x = _scratchX, y = _scratchY, z = _scratchZ

    const f = clamp(interpolationFactor, 0, 1)
    const t = target

    set(x, vx, ax*f)
    set(y, vy, ay)
    set(z, vz, az)

    // t' = x * slerp(t, y * z, f)
    copy(t, multiply(x, slerp(t, multiply(y, z), f)))
  }
}

const _scratchX = new Quaternion()
const _scratchY = new Quaternion()
const _scratchZ = new Quaternion()
