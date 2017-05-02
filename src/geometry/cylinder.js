'use strict'

/**
 * Module dependencies.
 */

import PrimitiveCylinder from 'primitive-cylinder'
import { Geometry } from '../core/geometry'

/**
 * CapsuleGeometry class.
 *
 * @public
 * @class CapsuleGeometry
 * @extends Geometry
 * @see {@link https://github.com/ataber/primitive-cylinder}
 */

export class CylinderGeometry extends Geometry {

  /**
   * CapsuleGeometry class constructor.
   *
   * @public
   * @constructor
   * @see {@link https://github.com/vorg/primitive-capsule}
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.radiusTop The radius of the cylinder at the top.
   * @param {?Number} opts.radiusBottom The radius of the cylinder at the bottom.
   * @param {?Number} opts.height The height of the cylinder.
   * @param {?Number} opts.radialSegments The number of segments for the radial axis.
   * @param {?Number} opts.heightSegments The number of segments for the height axis.
   * @throws TypeError
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    // defaults
    let { height = height || 5,
          radiusTop = radiusTop || 1,
          radiusBottom = radiusBottom || 1,
          radialSegments = radialSegments || 50,
          heightSegments = heightSegments || 50
        } = opts

    for (const o in opts) {
      if ( opts.hasOwnProperty(o) && 'number' != typeof opts[o] ) {
        throw new TypeError(`Expecting '${o}' to be a number. Got ${typeof opts[o]}.`)
      }
    }

    super({
      complex: PrimitiveCylinder(
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments),
    })

    this.height = height
    this.radiusTop = radiusTop
    this.radiusBottom = radiusBottom
    this.radialSegments = radialSegments
    this.heightSegments = heightSegments
  }
}
