import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { Vector } from '../core/vector'
import coalesce from 'defined'

/**
 * The Quaternion class represents an abstraction around a Vector
 * of 4 components that deals with numbers in a complex plane. Quaternions
 * are usefull for representing spatial rotations in 3D.
 *
 * @public
 * @class Quaternion
 * @implements Vector
 * @extends Vector
 * @see {@link http://mathworld.wolfram.com/Quaternion.html}
 * @see {@link https://en.wikipedia.org/wiki/Quaternion}
 * @see {@link https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation}
 */

export class Quaternion extends Vector {
  static swizzles() {
    return VectorSwizzleMap.Quaternion
  }

  static fromAxisAngle(angle, radians) {
    return quat.setAxisAngle(new Quaternion(), angle, radians)
  }

  static fromEuler(euler, order = 'xyz') {
    if (null == euler || ![...euler].every((x) => x == x && 'number' == typeof x)) {
      throw new TypeError("Expecting euler to have numbers.")
    }
    order = order || euler.order || null
    if ('string' != typeof order) {
      throw new TypeError(
      `Expecting euler order to be a string. Got ${typeof order}.`)
    }

    const cx = Math.cos(0.5*euler[0])
    const cy = Math.cos(0.5*euler[1])
    const cz = Math.cos(0.5*euler[2])
    const sx = Math.sin(0.5*euler[0])
    const sy = Math.sin(0.5*euler[1])
    const sz = Math.sin(0.5*euler[2])

    let x = 0
    let y = 0
    let z = 0
    let w = 1

    if (order == 'xyz') {
      x = sx * cy * cz + cx * sy * sz
      y = cx * sy * cz - sx * cy * sz
      z = cx * cy * sz + sx * sy * cz
      w = cx * cy * cz - sx * sy * sz
    } else if (order == 'yxz') {
      x = sx * cy * cz + cx * sy * sz
      y = cx * sy * cz - sx * cy * sz
      z = cx * cy * sz - sx * sy * cz
      w = cx * cy * cz + sx * sy * sz
    } else if (order == 'zxy') {
      x = sx * cy * cz - cx * sy * sz
      y = cx * sy * cz + sx * cy * sz
      z = cx * cy * sz + sx * sy * cz
      w = cx * cy * cz - sx * sy * sz
    } else if (order == 'zyx') {
      x = sx * cy * cz - cx * sy * sz
      y = cx * sy * cz + sx * cy * sz
      z = cx * cy * sz - sx * sy * cz
      w = cx * cy * cz + sx * sy * sz
    } else if (order == 'yzx') {
      x = sx * cy * cz + cx * sy * sz
      y = cx * sy * cz + sx * cy * sz
      z = cx * cy * sz - sx * sy * cz
      w = cx * cy * cz - sx * sy * sz
    } else if (order == 'xzy') {
      x = sx * cy * cz - cx * sy * sz
      y = cx * sy * cz - sx * cy * sz
      z = cx * cy * sz + sx * sy * cz
      w = cx * cy * cz + sx * sy * sz
    } else {
      throw new TypeError(`Unhandled Euler angle order. Got ${order}.`)
    }

    return new Quaternion(x, y, z, w)
  }

  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(coalesce(x, 0), coalesce(y, 0), coalesce(z, 0), coalesce(w, 1))
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }
  get y() { return this[1] }
  set y(y) { return this[1] = y }
  get z() { return this[2] }
  set z(z) { return this[2] = z }
  get w() { return this[3] }
  set w(w) { return this[3] = w }
}
