'use strict'

/**
 * Module dependencies.
 */

import PrimitiveSphere from 'primitive-sphere'
import { Geometry } from '../core/geometry'

/**
 * SphereGeometry class.
 *
 * @public
 * @class SphereGeometry
 * @extends Geometry
 * @see {@link https://github.com/glo-js/primitive-sphere}
 */

export class SphereGeometry extends Geometry {

  /**
   * SphereGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.radius SphereGeometry radius.
   * @param {?Number} opts.segments SphereGeometry subdivision segments.
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    // defaults
    let { radius = radius || 1,
          segments = segments || 32
        } = opts

    if ('number' != typeof radius) {
      throw new TypeError(
        `Expecting 'radius' to a be a number. Got ${typeof radius}.`
      )
    }

    if ('number' != typeof segments) {
      throw new TypeError(
        `Expecting 'segments' to a be a number. Got ${typeof segments}.`
      )
    }

    super({complex: PrimitiveSphere(radius, {segments})})

    this.radius = radius
    this.segments = segments
  }
}
