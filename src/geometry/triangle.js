'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../core/geometry'


/**
 * TriangleGeometry class.
 *
 * @public
 * @class TriangleGeometry
 * @extends Geometry
 */

export class TriangleGeometry extends Geometry {

  /**
   * TriangleGeometry class constructor.
   *
   * @public
   * @constructor
   */

  constructor() {
    super({
      complex: {
        positions: [
          [-1.0, -0.5*Math.sqrt(3), +0.0],
          [+1.0, -0.5*Math.sqrt(3), +0.0],
          [+0.0, +0.5*Math.sqrt(3), +0.0],
        ],

        normals: [
          [-1.0, -1.0, +0.0],
          [+1.0, -1.0, +0.0],
          [+0.0, +1.0, +0.0],
        ],

        uvs: [
          [-1.0, -0.5*Math.sqrt(3)],
          [+1.0, -0.5*Math.sqrt(3)],
          [+0.0, +0.5*Math.sqrt(3)],
        ],
      }
    })
  }
}
