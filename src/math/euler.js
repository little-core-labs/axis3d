import * as VectorSwizzleMap from '../core/vector_swizzle_map'
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

  static swizzles() {
    return VectorSwizzleMap.Euler
  }

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
  constructor(x, y, z, order = 'xyz') {
    super(coalesce(x, 0), coalesce(y, 0), coalesce(z, 0))
    if ('string' != typeof order) {
      throw new TypeError(
        `Expecting euler order to be a string. Got ${typeof order}.`)
    }

    this.order = order
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
