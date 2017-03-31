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
   *
   * @see {@link https://www.npmjs.com/package/primitive-plane}
   */

  constructor({
    size = {x: 1, y: 1},
    segments = {x: 5, y: 5},
    quads = false,
  } = {}) {
    if ('number' == typeof segments) {
      segments = {x: segments, y: segments}
    }

    if ('number' == typeof size) {
      size = {x: size, y: size}
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
  }
}
