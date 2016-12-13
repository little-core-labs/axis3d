'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from './geometry'

/**
 * TriangleGeometry class.
 *
 * @public
 * @class TriangleGeometry
 */

export class TriangleGeometry extends Geometry {

  /**
   * TriangleGeometry class constructor.
   */

  constructor() {
    const complex = {
      positions: [
        [-0.0, +0.5],
        [+0.5, -0.5],
        [-0.5, -0.5],
      ],

      normals: [
        [-0.0, +1.0],
        [+1.0, -1.0],
        [-1.0, -1.0],
      ],

      uvs: [
        [-0.0, +0.5],
        [+0.5, -0.5],
        [-0.5, -0.5],
      ],
    }

    super({complex})
  }
}
