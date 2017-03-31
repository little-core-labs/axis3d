'use strict'

/**
 * Module dependencies.
 */

import PrimitiveSphere from 'primitive-sphere'
import { Geometry } from '../core/geometry'

/**
 * SphereGeometry class.
 *
 * @public
 * @class SphereGeometry
 * @extends Geometry
 * @see {@link https://github.com/glo-js/primitive-sphere}
 */

export class SphereGeometry extends Geometry {

  /**
   * SphereGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.radius SphereGeometry radius.
   * @param {?Number} opts.segments SphereGeometry subdivision segments.
   */

  constructor({radius = 1, segments = 32} = {}) {
    super({complex: PrimitiveSphere(radius, {segments})})
    this.radius = radius
    this.segments = segments
  }
}
