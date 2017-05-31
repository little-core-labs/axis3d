'use strict'

/**
 * Module dependencies.
 */

import { Vector3, Vector2 } from '../math/vector'

import getBoundingBox from 'bound-points'
import Wireframe from 'screen-projected-lines'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import normals from 'normals'

/** @virtual {SimplicialComplex} https://github.com/mikolalysenko/simplicial-complex */

/**
 * The Geometry class represents a base class for primitive geometries.
 *
 * @public
 * @class Geometry
 * @see {@link https://en.wikipedia.org/wiki/Abstract_simplicial_complex}
 * @see {@link https://github.com/mikolalysenko/simplicial-complex}
 */

export class Geometry {

  /**
   * Geometry class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts Class constructor options.
   * @param {?SimplicialComplex} opts.complex
   * @param {?Boolean} opts.flatten
   */

  constructor({complex = null, flatten = false} = {}) {

    /**
     * Internal simplicial complex value.
     * @private
     */

    Object.defineProperty(this, '_complex', {
      enumerable: false,
      writable: false,
      value: {},
    })

    /**
     * Property indicating whether a geometry simplicial complex
     * should be flattened.
     *
     * @public
     * @type {Boolean}
     */

    this.flatten = flatten

    /** @ignore */
    this.complex = complex || null
  }

  /**
   * Simplicial complex setter. Complex is flattened
   * if `.flatten` is set to `true`.
   *
   * @public
   * @accessor
   * @type {SimplicialComplex}
   * @see {@link Geometry#flatten}
   */

  set complex(complex) {
    if (complex instanceof Geometry) {
      complex = complex.complex
    }

    if (complex) {
      if (this.flatten && complex.cells) {
        const cells = complex.cells.map((cell) => cell.slice())
        const flattened = reindex(unindex(complex.positions, cells))
        try {
          complex.normals = normals.vertexNormals(
            flattened.cells,
            flattened.positions)
        } catch (e) { console.warn("Unable to compute vertex normals.") }
        Object.assign(complex, flattened)
      }

      if (null == complex.normals && complex.positions && complex.cells) {
        try {
          complex.normals = normals.vertexNormals(
            complex.cells,
            complex.positions)
        } catch (e) { console.warn("Unable to compute vertex normals.") }
      }
    }

    Object.assign(this._complex, complex)
    return complex
  }

  /**
   * SimplicialComplex complex getter.
   *
   * @public
   * @accessor
   * @type {SimplicialComplex|null}
   */

  get complex() {
    return this._complex || null
  }

  /**
   * Simplicial complex position vectors.
   *
   * @public
   * @accessor
   * @type {Array<Number|Array>|null}
   */

  get positions() {
    return this.complex ? this.complex.positions : null
  }

  /**
   * Simplicial complex normal vectors.
   *
   * @public
   * @accessor
   * @type {Array<Number|Array>|null}
   */

  get normals() {
    return this.complex ? this.complex.normals : null
  }

  /**
   * Simplicial complex uv vectors.
   *
   * @public
   * @accessor
   * @type {Array<Number|Array>|null}
   */

  get uvs() {
    return this.complex ? this.complex.uvs : null
  }

  /**
   * Simplicial complex position cells. The faces of
   * the geometry.
   *
   * @public
   * @accessor
   * @type {Array<Number|Array>|null}
   */

  get cells() {
    return this.complex ? this.complex.cells : null
  }

  /**
   * Computes and returns a bounding box for the geometry.
   *
   * @return {Array<Vector3|Vector2>}
   */

  computeBoundingBox() {
    return getBoundingBox(this.positions)
      .map((p) => {
        switch (p.length) {
          case 3: return new Vector3(...p)
          case 2: return new Vector2(...p)
        }
      })
  }
}
