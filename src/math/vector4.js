'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { Vector } from '../core/vector'

/**
 * The Vector4 class represents a vector with two components.
 *
 * @public
 * @class Vector4
 * @implements Vector
 * @extends Vector
 */

export class Vector4 extends Vector {

  /**
   * Vector4 class constructor.
   *
   * @public
   * @constructor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   */

  constructor(x = 0, y = 0, z = 0, w = 0) {
    super(x, y, z, w)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

  get z() { return this[2] }
  set z(z) { return this[2] = z }

  get w() { return this[3] }
  set w(w) { return this[3] = w }

  get r() { return this[0] }
  set r(r) { return this[0] = r }

  get g() { return this[1] }
  set g(g) { return this[1] = g }

  get b() { return this[2] }
  set b(b) { return this[2] = b }

  get a() { return this[3] }
  set a(a) { return this[3] = a }
}
