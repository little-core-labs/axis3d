'use strict'

/**
 * Module dependencies.
 */

import * as VectorSwizzleMap from '../core/vector_swizzle_map'
import { Vector } from '../core/vector'

/**
 * The Vector2 class represents a vector with one components.
 *
 * @public
 * @class Vector1
 * @implements Vector
 * @extends Vector
 */

export class Vector1 extends Vector {

  /**
   * Vector1 class constructor.
   *
   * @public
   * @constructor
   * @param {Mixed} x
   */

  constructor(x = 0) {
    super(x)
  }

  static swizzles() {
    return VectorSwizzleMap.Vector
  }
}
