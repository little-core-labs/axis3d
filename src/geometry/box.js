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
   *
   * @see {@link https://www.npmjs.com/package/primitive-cube}
   */

  constructor({x = 1, y = 1, z = 1, segments = 1} = {}) {
    if (null == arguments[0]) {
      x = 1, y = 1, z = 1
      segments = 1
    }

    if ('number' == typeof segments) {
      segments = {x: segments, y: segments, z: segments}
    }

    super({
      complex: PrimitiveCube(x, y, z, segments.x, segments.y, segments.z)
    })

    this.size = {x, y, z}
    this.segments = segments
  }
}
