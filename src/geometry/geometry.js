'use strict'

/**
 * Module dependencies.
 */

import Wireframe from 'screen-projected-lines'
import normals from 'angle-normals'

export class Geometry {
  constructor(initialState) {
    Object.assign(this, initialState || {})
    this.complex = this.complex || null
    this.wireframe = null == this.complex ? null : Wireframe(this.complex, {
      attributes: {
        normals: this.complex.cells && this.complex.positions && normals(
          this.complex.cells,
          this.complex.positions
        )
      }
    })

    if (this.wireframe) {
      this.wireframe.normals = this.wireframe.attributes.normals
    }
  }

  /**
   * An array of position values sourced from
   * the geometry complex.
   */

  get positions() {
    return this.complex ? this.complex.positions : null
  }

  /**
   * An array of normal values sourced from
   * the geometry complex.
   */

  get normals() {
    return this.complex ? this.complex.normals : null
  }

  /**
   * An array of uv values sourced from
   * the geometry complex.
   */

  get uvs() {
    return this.complex ? this.complex.uvs : null
  }

  /**
   * An array of cell values sourced from
   * the geometry complex.
   */

  get cells() {
    return this.complex ? this.complex.cells : null
  }

  /**
   * Abstract update method to be overloaded
   */

  update() {
    return this
  }
}
