'use strict'

/**
 * Module dependencies.
 */

import Wireframe from 'screen-projected-lines'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import normals from 'angle-normals'

module.exports = exports = (...args) => new Geometry(...args)
export class Geometry {
  constructor({complex = null, flatten = false} = {}) {
    if (complex instanceof Geometry) {
      complex = complex.complex
    }

    if (complex) {
      if (flatten && complex.cells) {
        const cells = complex.cells.map((cell) => cell.slice())
        const flattened = reindex(unindex(complex.positions, cells))
        complex.normals = normals(flattened.cells, flattened.positions)
        Object.assign(complex, flattened)
      }

      if (null == complex.normals && complex.positions && complex.cells) {
        complex.normals = normals(complex.cells, complex.positions)
      }
    }

    this.complex = complex || null
  }

  get positions() {
    return this.complex ? this.complex.positions : null
  }

  get normals() {
    return this.complex ? this.complex.normals : null
  }

  get uvs() {
    return this.complex ? this.complex.uvs : null
  }

  get cells() {
    return this.complex ? this.complex.cells : null
  }
}
