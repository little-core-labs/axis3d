'use strict'

/**
 * Module dependencies.
 */

import PrimitiveCube from 'primitive-cube'
import { Geometry } from '../core/geometry'

/**
 * BoxGeometry class.
 *
 * @public
 * @class BoxGeometry
 * @extends Geometry
 * @see {@link https://github.com/gregtatum/geo-3d-box}
 */

export class BoxGeometry extends Geometry {

  /**
   * BoxGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.x Size along the x axis.
   * @param {?Number} opts.y Size along the y axis.
   * @param {?Number} opts.z Size along the z axis.
   * @param {?Object|Number} opts.segments Number of subdivision segments.
   * @param {?Number} opts.segments.x Number of x axis subdivision segments.
   * @param {?Number} opts.segments.y Number of y axis subdivision segments.
   * @param {?Number} opts.segments.z Number of z axis subdivision segments.
   * @throws TypeError
   *
   * @see {@link https://www.npmjs.com/package/primitive-cube}
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    let { segments, x, y, z } = opts

    // defaults
    if (null == segments) { segments = 1 }
    if (null == x) { x = 1 }
    if (null == y) { y = 1 }
    if (null == z) { z = 1 }

    if ('number' != typeof x) {
      throw new TypeError(`Expecting '.x' to a be a number. Got ${typeof x}.`)
    }

    if ('number' != typeof y) {
      throw new TypeError(`Expecting '.y' to a be a number. Got ${typeof y}.`)
    }

    if ('number' != typeof z) {
      throw new TypeError(`Expecting '.z' to a be a number. Got ${typeof z}.`)
    }

    if ('number' != typeof segments && 'object' != typeof segments) {
      throw new TypeError(
        `Expecting '.segments' to be an object or 'number'. ` +
        `Got ${typeof segments}`
      )
    }

    if ('number' == typeof segments) {
      segments = {x: segments, y: segments, z: segments}
    } else if ('object' == typeof segments) {
      if ('number' != typeof segments.x) {
        throw new TypeError(
          `Expecting '.segments.x' to a be a number. Got ${typeof segments.x}.`
        )
      } else if ('number' != typeof segments.y) {
        throw new TypeError(
          `Expecting '.segments.y' to a be a number. Got ${typeof segments.y}.`
        )
      } else if ('number' != typeof segments.z) {
        throw new TypeError(
          `Expecting '.segments.z' to a be a number. Got ${typeof segments.z}.`
        )
      }
    }

    super({
      complex: PrimitiveCube(x, y, z, segments.x, segments.y, segments.z)
    })

    this.size = {x, y, z}
    this.segments = segments
  }
}
