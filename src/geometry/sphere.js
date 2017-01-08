'use strict'

/**
 * Module dependencies.
 */

import PrimitiveSphere from 'primitive-sphere'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new SphereGeometry(...args)
export class SphereGeometry extends Geometry {
  constructor(opts = {}) {
    const {
      radius = 1, segments = 32
    } = opts
    super({...opts, complex: PrimitiveSphere(radius, {segments})})
  }
}
