'use strict'

/**
 * Module dependencies.
 */

import PrimitiveBox from 'geo-3d-box'
import { Geometry } from './geometry'

module.exports = exports = (...args) => new BoxGeometry(...args)
export class BoxGeometry extends Geometry {
  constructor({size = 1, segments = 2} = {}) {
    super({complex: PrimitiveBox({size, segments})})
  }
}
