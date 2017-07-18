'use strict'

/**
 * Module dependencies.
 */

import PrimitivePlane from 'primitive-plane'
import { Geometry } from '../core/geometry'

/**
 * PlaneGeometry class.
 *
 * @public
 * @class PlaneGeometry
 * @extends Geometry
 */

export class PlaneGeometry extends Geometry {

  /**
   * PlaneGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts
   * @param {?Object|Number} opts.size
   * @param {?Number} opts.size.x
   * @param {?Number} opts.size.y
   * @param {?Object|Number} opts.segments
   * @param {?Number} opts.segments.x
   * @param {?Number} opts.segments.y
   * @param {?Boolean} opts.quads
   * @throws TypeError
   *
   * @see {@link https://www.npmjs.com/package/primitive-plane}
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    let { size = size || {x: 1, y: 1},
          segments = segments || {x: 5, y: 5},
          quads = quads || false} = opts

    if ('number' == typeof segments) {
      segments = {x: segments, y: segments}
    } else if ('object' == typeof segments) {
      if ('number' != typeof segments.x) {
        throw new TypeError(
          `Expecting '.segments.x' to a be a number. Got ${typeof segments.x}.`
        )
      } else if ('number' != typeof segments.y) {
        throw new TypeError(
          `Expecting '.segments.y' to a be a number. Got ${typeof segments.y}.`
        )
      }
    }

    if ('number' == typeof size) {
      size = {x: size, y: size}
    } else if ('object' == typeof size) {
      if ('number' != typeof size.x) {
        throw new TypeError(
          `Expecting '.size.x' to a be a number. Got ${typeof size.x}.`
        )
      } else if ('number' != typeof size.y) {
        throw new TypeError(
          `Expecting '.size.y' to a be a number. Got ${typeof size.y}.`
        )
      }
    }

    super({
      complex: PrimitivePlane(
        size.x, size.y,
        segments.x, segments.y,
        {quads}
      )
    })

    this.size = size
    this.quads = quads
    this.segments = segments
    console.log(this)
  }
}
