'use strict'

/**
 * Module dependencies.
 */

import PrimitiveSphere from 'primitive-sphere'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new SphereGeometry(...args)
export class SphereGeometry extends Geometry {
  constructor({radius = 1, segments = 32} = {}) {
    super({complex: PrimitiveSphere(radius, {segments})})
  }
}
