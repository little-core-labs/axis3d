'use strict'

/**
 * Module dependencies.
 */

import PrimitiveCapsule from 'primitive-capsule'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new CapsuleGeometry(...args)
export class CapsuleGeometry extends Geometry {
  constructor({
    radius = 1,
    height = 1,
    segments = 12,
    subdivisions = 12
  } = {}) {
    super({complex: PrimitiveCapsule(radius, height, subdivisions, segments)})
  }
}
