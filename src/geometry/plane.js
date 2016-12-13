'use strict'

/**
 * Module dependencies.
 */

import PrimitivePlane from 'primitive-plane'
import { Geometry } from './geometry'

/**
 * PlaneGeometry class.
 *
 * @public
 * @class PlaneGeometry
 * @extends Geometry
 * @see https://www.npmjs.com/package/complex-plane
 */

export class PlaneGeometry extends Geometry {
  constructor({
    segments = {x: 1, y: 1},
    size = {x: 1, y: 1},
  } = {}) {
    segments = (
      'number' == typeof segments ?
       {x: segments, y: segments} :
       segments
    )

    size = (
      'number' == typeof size ?
      {x: size, y: size} :
      size
    )

    const complex = PrimitivePlane(
      segments.x, segments.y,
      size.x, size.y,
      {quad: false}
    )

    super({size, segments, complex})
  }

  /**
   * Updates PlaneGeometry state
   *
   * @return {PlaneGeometry}
   */

  update() {
    const segments = this.segments
    const size = this.size
    this.complex = PrimitivePlane({size, segments})
    return this
  }
}
