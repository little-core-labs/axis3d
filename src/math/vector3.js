'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { Vector } from '../core/vector'

/**
 * The Vector3 class represents a vector with two components.
 *
 * @public
 * @class Vector3
 * @implements Vector
 * @extends Vector2
 */

export class Vector3 extends Vector {

  /**
   * Vector3 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   * @param {Mixed} y
   * @param {Mixed} z
   */

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z)
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

  get r() { return this[0] }
  set r(r) { return this[0] = r }

  get g() { return this[1] }
  set g(g) { return this[1] = g }

  get b() { return this[2] }
  set b(b) { return this[2] = b }
}
