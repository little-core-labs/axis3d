'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { assignTypeName } from '../core/types'
import { Vector } from '../core/vector'

import ThreeEuler from 'math-euler'
import coalesce from 'defined'
import mat4 from 'gl-mat4'

const scratchMat4 = mat4.identity([])

/**
 * The Euler class represents an abstraction around Euler angles.
 *
 * @public
 * @class Euler
 * @implements Vector
 * @extends Vector
 * @see {@link https://en.wikipedia.org/wiki/Euler_angles}
 * @see {@link http://mathworld.wolfram.com/EulerAngles.html}
 * @see {@link http://www.chrobotics.com/library/understanding-euler-angles}
 */

export class Euler extends Vector {

  /**
   * Euler class constructor.
   *
   * @public
   * @constructor
   * @param {?Number} x Rotation angle about the X axis.
   * @param {?Number} y Rotation angle about the Y axis.
   * @param {?Number} z Rotation angle about the Z axis.
   * @param {?String} order Euler angle rotation order.
   * @throws TypeError
   */

  constructor(x, y, z, order = 'xyz') {
    super(coalesce(x, 0), coalesce(y, 0), coalesce(z, 0))
    // Euler gets special treatment because it is 3 component vector
    // and it would be beneficial to know if it is actually an Euler
    assignTypeName(this, 'euler')
    if ('string' != typeof order) {
      throw new TypeError(
        `Expecting euler order to be a string. Got ${typeof order}.`)
    }

    /**
     * Euler angle rotation order.
     *
     * @public
     * @type {String}
     */

    this.order = order
  }

  /**
   * Euler swizzles.
   *
   * @public
   * @static
   * @method
   * @return {Array<Array<String>>}
   */

  static swizzles() {
    return VectorSwizzleMap.Euler
  }

  /**
   * Helper function to compute euler angles from
   * a given quaternion.
   *
   * @public
   * @function
   * @param {Quaternion|Array<Nunber>} q Input quaternion.
   * @param {?String} order Rotation order.
   * @return {Vector}
   * @throws TypeError
   */

  static fromQuaternion(q, order = 'xyz') {
    if ('string' != typeof order) {
      throw new TypeError(
        `Expecting euler order to be a string. Got ${typeof order}.`)
    }
    order = order.toUpperCase()
    const euler = new ThreeEuler()
    const elements = mat4.fromQuat(scratchMat4, q)
    euler.setFromRotationMatrix({elements}, order)
    return new Euler(euler.x, euler.y, euler.z, order)
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

  get z() { return this[2] }
  set z(z) { return this[2] = z }

  get roll() { return this[0] }
  set roll(roll) { return this[0] = roll }

  get pitch() { return this[1] }
  set pitch(pitch) { return this[1] = pitch }

  get yaw() { return this[2] }
  set yaw(yaw) { return this[2] = yaw }
}
