'use strict'

/**
 * Module dependencies.
 */

import PrimitiveTorus from 'primitive-torus'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new TorusGeometry(...args)
export class TorusGeometry extends Geometry {
  constructor({
    majorRadius = 1,
    minorRadius = 0.5,
    majorSegments = 32,
    minorSegments = 64,
    arc = 2*Math.PI
  } = {}) {
    super({
      complex: PrimitiveTorus({
        arc,
        majorRadius, minorSegments,
        majorSegments, minorSegments,
      })
    })
  }
}
