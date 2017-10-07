import getBoundingBox from 'bound-points'
import coalesce from 'defined'
import flatten from 'array-flatten'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import normals from 'normals'
import vec2 from 'gl-vec2'

/**
 * The Geometry class wraps an object describing a simplicial complex. The
 * object should contain at the very least, an array of vertex positions. This
 * class also concerns itself with vertex normals, UVs, and faces
 * @public
 * @class Geometry
 * @see {@link https://en.wikipedia.org/wiki/Abstract_simplicial_complex}
 * @see {@link https://github.com/mikolalysenko/simplicial-complex}
 */
export class Geometry {

  /**
   * Geometry class constructor.
   * @public
   * @constructor
   * @param {?(Object|Geometry)} [opts = {}] Context configuration, simplicial complex or Geometry instance
   * @param {?(Object)} [opts.complex] Simplicial complex object
   * @param {?(Boolean)} [opts.complex] Simplicial complex object
   */
  constructor(opts = {}) {
    if (null != opts && 'object' != typeof opts || Array.isArray(opts)) {
      throw new TypeError("Geometry(): Expecting object as first argument.")
    } else if (null == opts) {
      opts = {}
    }
    let complex = {}
    if (opts.positions) { complex = opts }
    else if ('complex' in opts) { complex = opts.complex }
    let flatten = coalesce(opts.flatten, complex.flatten, false)
    Object.defineProperty(this, '_complex', {enumerable: false, value: {}})
    this.flatten = Boolean(flatten)
    this.complex = complex || null
  }

  /**
   * Geometry simplicial complex.
   * @public
   * @accessor
   * @type {Object}
   */
  get complex() { return this._complex || null }
  set complex(complex) {
    if (null === complex) { this._complex = null }
    if (complex.complex) { complex = complex.complex }
    if (complex) {
      if (complex.positions) { ensure3D(complex.positions) }
      if (complex.normals) { ensure3D(complex.normals) }
      if (this.flatten && complex.cells) {
        const cells = complex.cells.map((cell) => cell.slice())
        const flattened = reindex(unindex(complex.positions, cells))
        try {
          complex.normals = normals.vertexNormals(
            flattened.cells,
            flattened.positions)
        } catch (e) {
          console.warn("Geometry(): Unable to compute vertex normals.")
        }
        Object.assign(complex, flattened)
      } else if (complex.positions && !complex.cells) {
        Object.assign(complex, reindex(flatten(complex.positions)))
      }

      if (null == complex.normals && complex.positions && complex.cells) {
        try {
          complex.normals = normals.vertexNormals(
            complex.cells,
            complex.positions)
        } catch (e) {
          console.warn("Geometry(): Unable to compute vertex normals.")
        }
      }

      if (Array.isArray(complex.uvs)) {
        ensure2D(complex.uvs)
      } else if (Array.isArray(complex.positions)) {
        complex.uvs = complex.positions.map((p) => {
          return vec2.normalize([], p.slice(0, 2))
        })
      }
    }

    Object.assign(this._complex, complex)
    return complex
  }

  /**
   * Geometry vertex positions.
   * @public
   * @accessor
   * @readonly
   * @type {Array<Array<Number>>|null}
   */
  get positions() { return this.complex && this.complex.positions || null }

  /**
   * Geometry vertex normals.
   * @public
   * @accessor
   * @readonly
   * @type {Array<Array<Number>>|null}
   */
  get normals() { return this.complex && this.complex.normals || null }

  /**
   * Geometry vertex faces (cells).
   * @public
   * @accessor
   * @readonly
   * @type {Array<Array<Number>>|null}
   */
  get faces() { return this.cells }
  get cells() { return this.complex && this.complex.cells || null }

  /**
   * Geometry vertex UVs (texture coordinates)..
   * @public
   * @accessor
   * @readonly
   * @type {Array<Array<Number>>|null}
   */
  get uvs() { return this.complex && this.complex.uvs || null }

  /**
   * Computes and returns the bounding box of the geometry
   * @public
   * @method
   * @return {Array<Array<Number>>|null}
   */
  computeBoundingBox() {
    return this.positions ? getBoundingBox(this.positions) : null
  }
}

/**
 * ensure3D(nodes: Array<Array<Number>>) -> Array
 */
function ensure3D(nodes) {
  for (const node of nodes) { ensureVectorLength(3, node) }
  return nodes
}

/**
 * ensure2D(nodes: Array<Array<Number>>) -> Array
 */
function ensure2D(nodes) {
  for (const node of nodes) { ensureVectorLength(2, node) }
  return nodes
}

/**
 * ensureVectorLength(length: Number, vector: Array<Number>) -> Array
 */
function ensureVectorLength(length, vector) {
  for (let i = 0; i < length; ++i) {
    if (null == vector[i]) { vector[i] = 0 }
  }
  vector.splice(length)
  return vector
}
