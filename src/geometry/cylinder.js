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
   * @param {?Number} radiusTop The radius of the cylinder at the top.
   * @param {?Number} radiusBottom The radius of the cylinder at the bottom.
   * @param {?Number} height The height of the cylinder.
   * @param {?Number} radialSegments The number of segments for the radial axis.
   * @param {?Number} heightSegments The number of segments for the height axis.
   */

  constructor({
    height = 5,
    radiusTop = 1,
    radiusBottom = 1,
    radialSegments = 50,
    heightSegments = 50,
  } = {}) {
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
