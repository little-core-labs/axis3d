'use strict'

/**
 * Module dependencies.
 */

import PrimitiveCylinder from 'primitive-cylinder'
import { Geometry } from './geometry'

/**
 * @see https://www.npmjs.com/package/primitive-cylinder
 */

module.exports = exports = (...args) => new CylinderGeometry(...args)
export class CylinderGeometry extends Geometry {
  constructor({
    radiusTop = 1,
    radiusBottom = 1,
    height = 5,
    radialSegments = 50,
    heightSegments = 50,
  } = {}) {
    super({
      complex: PrimitiveCylinder(
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments)
    })
  }
}
