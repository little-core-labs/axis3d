'use strict'

/**
 * Module dependencies.
 */

import PrimitiveTorus from 'primitive-torus'
import { Geometry } from '../core/geometry'

/**
 * TorusGeometry class.
 *
 * @public
 * @class TorusGeometry
 * @extends Geometry
 * @see {@link https://github.com/glo-js/primitive-torus}
 */

export class TorusGeometry extends Geometry {

  /**
   * TorusGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts Class constructor options.
   * @param {?Number} opts.majorRadius The radius of the major ring R.
   * @param {?Number} opts.minorRadius The radius of the minor ring r.
   * @param {?Number} opts.majorSegments The number of segments for the major ring.
   * @param {?Number} opts.minorSegments The number of segments for the minor ring.
   * @param {?Number} opts.arc The arc to draw.
   */

  constructor(opts) {
    // ensure object
    if (null == opts || 'object' != typeof opts) {
      opts = {}
    }

    // // defaults
    let {
      majorSegments = majorSegments || 32,
      minorSegments = minorSegments || 64,
      majorRadius = majorRadius || 1,
      minorRadius = minorRadius || 0.5,
      arc = arc || 2*Math.PI,
    } = opts

    for (const o in opts) {
      if (opts.hasOwnProperty(o) && 'number' != typeof opts[o]) {
        throw new TypeError(
          `Expecting '${o}' to a be a number. Got ${typeof opts[o]}.`
        )
      }
    }

    super({
      complex: PrimitiveTorus({
        majorSegments, minorSegments,
        majorRadius, minorSegments,
        arc,
      }),
    })

    this.majorSegments = majorSegments
    this.minorSegments = minorSegments
    this.majorRadius = majorRadius
    this.minorRadius = minorRadius
    this.arc = arc
  }
}
