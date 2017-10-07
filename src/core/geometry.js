import getBoundingBox from 'bound-points'
import coalesce from 'defined'
import flatten from 'array-flatten'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import normals from 'normals'
import vec2 from 'gl-vec2'

export class Geometry {
  constructor(opts = {}) {
    let complex = {}
    if (opts.positions) { complex = opts }
    else { complex = opts.complex }
    let flatten = coalesce(opts.flatten, complex.flatten, false)
    Object.defineProperty(this, '_complex', {enumerable: false, value: {}})
    this.flatten = Boolean(flatten)
    this.complex = complex || null
  }

  set complex(complex) {
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
        } catch (e) { console.warn("Unable to compute vertex normals.") }
        Object.assign(complex, flattened)
      } else if (complex.positions && !complex.cells) {
        Object.assign(complex, reindex(flatten(complex.positions)))
      }

      if (null == complex.normals && complex.positions && complex.cells) {
        try {
          complex.normals = normals.vertexNormals(
            complex.cells,
            complex.positions)
        } catch (e) { console.warn("Unable to compute vertex normals.") }
      }

      if (complex.uvs) {
        ensure2D(complex.uvs)
      } else {
        complex.uvs = complex.positions.map((p) => {
          return vec2.normalize([], p.slice(0, 2))
        })
      }
    }

    function ensure3D(nodes) {
      for (const node of nodes) {
        ensureVectorLength(3, node)
      }
    }

    function ensure2D(nodes) {
      for (const node of nodes) {
        ensureVectorLength(2, node)
      }
    }

    function ensureVectorLength(length, vector) {
      for (let i = 0; i < length; ++i) {
        if (null == vector[i]) { vector[i] = 0 }
      }
      vector.splice(length)
    }


    Object.assign(this._complex, complex)
    return complex
  }

  get complex() {
    return this._complex || null
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

  computeBoundingBox() {
    return getBoundingBox(this.positions)
  }
}
