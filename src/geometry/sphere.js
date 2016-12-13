'use strict'

/**
 * Module dependencies.
 */

import PrimitiveSphere from 'primitive-sphere'
import { Geometry } from './geometry'

/**
 * SphereGeometry class.
 *
 * @public
 * @class SphereGeometry
 * @extends Geometry
 * @see https://www.npmjs.com/package/complex-sphere
 */

export class SphereGeometry extends Geometry {
  constructor({radius = 1, segments = 28} = {}) {
    const complex = PrimitiveSphere(radius, {segments})
    super({radius, segments, complex})
  }

  /**
   * Updates SphereGeometry state
   *
   * @return {SphereGeometry}
   */

  update() {
    const segments = this.segments
    const radius = this.radius
    this.complex = PrimitiveSphere(radius, {segments})
    return this
  }
}
