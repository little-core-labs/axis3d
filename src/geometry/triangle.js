'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from './geometry'

module.exports = exports = (...args) => new TriangleGeometry(...args)
export class TriangleGeometry extends Geometry {
  constructor() {
    super({
      complex: {
        positions: [
          [-0.0, +0.5, +0.0],
          [+0.5, -0.5, +0.0],
          [-0.5, -0.5, +0.0],
        ],

        normals: [
          [-0.0, +1.0, +0.0],
          [+1.0, -1.0, +0.0],
          [-1.0, -1.0, +0.0],
        ],

        uvs: [
          [-0.0, +0.5],
          [+0.5, -0.5],
          [-0.5, -0.5],
        ],
      }
    })
  }
}
