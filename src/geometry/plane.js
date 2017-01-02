'use strict'

/**
 * Module dependencies.
 */

import PrimitivePlane from 'primitive-plane'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new PlaneGeometry(...args)
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

    super({
      complex: PrimitivePlane(
        segments.x, segments.y,
        size.x, size.y,
        {quad: false}
      )
    })
  }
}
