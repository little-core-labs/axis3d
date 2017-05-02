'use strict'

/**
 * Module dependencies.
 */

import PrimitiveCapsule from 'primitive-capsule'
import { Geometry } from '../core/geometry'

/**
 * CapsuleGeometry class.
 *
 * @public
 * @class CapsuleGeometry
 * @extends Geometry
 * @see {@link https://github.com/vorg/primitive-capsule}
 */

export class CapsuleGeometry extends Geometry {

  /**
   * CapsuleGeometry class constructor.
   *
   * @public
   * @constructor
   * @see {@link https://github.com/vorg/primitive-capsule}
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.radius Geometry radius. Defaults to 1.
   * @param {?Number} opts.height Geometry height. Defaults to 0.5.
   * @param {?Number} opts.segments A number indicating the number of geometry
   *                                segments. Defaults to 12.
   * @param {?Number} opts.resolution Geometry resolution. Defaults to 12.
   * @throws TypeError
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    // defaults
    let { radius = radius || 1,
          height = height || 0.5,
          segments = segments || 12,
          resolution = resolution || 24
        } = opts

    for (const o in opts) {
      if ( opts.hasOwnProperty(o) && 'number' != typeof opts[o] ) {
        throw new TypeError(`Expecting '${o}' to be a number. Got ${typeof opts[o]}.`)
      }
    }

    super({
      complex: PrimitiveCapsule(radius, height, resolution, segments)
    })

    this.radius = radius
    this.height = height
    this.segments = segments
    this.resolution = resolution
  }
}
