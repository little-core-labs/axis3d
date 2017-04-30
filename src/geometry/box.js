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

  // constructor({x = 1, y = 1, z = 1, segments = 1} = {}) {
  // was this^ but passing in null produced:
  // TypeError: Cannot read property 'x' of null
  constructor(object) {
    if (null == object) {
      var x = 1, y = 1, z = 1 // I think you will hate these vars
      var segments = 1
      object = {x:1, y:1, z:1, segments:1}
    }

    Object.assign({x:1, y:1, z:1, segments:1}, object)

    x = object.x
    y = object.y
    z = object.z
    segments = object.segments

    if ('number' != typeof segments) {
      throw new TypeError(`Expecting 'segments' to be a 'number'. Got ${typeof segments}`)
    }

    segments = {x: segments, y: segments, z: segments}

    super({
      complex: PrimitiveCube(x, y, z, segments.x, segments.y, segments.z)
    })

    this.size = {x, y, z}
    this.segments = segments
  }
}
