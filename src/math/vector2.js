'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { Vector } from '../core/vector'

/**
 * The Vector2 class represents a vector with two components.
 *
 * @public
 * @class Vector2
 * @implements Vector
 * @extends Vector
 */

export class Vector2 extends Vector {

  /**
   * Vector2 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   * @param {Mixed} y
   */

  constructor(x = 0, y = 0) {
    super(x, y)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }

  get x() { return this[0] }
  set x(x) { return this[0] = x }

  get y() { return this[1] }
  set y(y) { return this[1] = y }

}
