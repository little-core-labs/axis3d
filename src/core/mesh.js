'use strict'

/**
 * Module dependencies.
 */

import { ensureRGBA, define, isArrayLike } from '../utils'
import { Object3D, Object3DContext} from './object3d'
import { Vector3, Vector2 } from '../math'
import { assignTypeName } from './types'
import { incrementStat } from '../stats'
import { Geometry } from './geometry'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import clamp from 'clamp'
import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'

const kMat4Identity = mat4.identity([])
const kMat3Identity = mat3.identity([])

/**
 * The default wireframe drawing primitive.
 *
 * @public
 * @const
 * @type {String}
 */

export const kDefaultMeshWireframePrimitive = 'line strip'

/**
 * The default wireframe line thickness value.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultMeshWireframeThickness = 1

/**
 * The default mesh drawing primitive.
 *
 * @public
 * @const
 * @type {String}
 */

export const kDefaultMeshPrimitive = 'triangles'

/**
 * The default vertex shader shource string.
 *
 * @public
 * @const
 * @type {String}
 */

export const kDefaultMeshVertexShader = glslify(__dirname + '/../glsl/mesh/vert.glsl')

/**
 * The Mesh class represents an abstraction around something drawable
 * to the screen. This class consumes a {@link Geometry} that provides
 * simplicial complex data such as positions, normals, and uv coordinates.
 * This class provides a default vertex shader and expects a fragment shader
 * to be injected into the context before drawing. This class extends
 * {@link Object3D] which gives it a 3D positional interface.
 *
 * @public
 * @class Mesh
 * @extends Object3D
 */

export class Mesh extends Object3D {

  /**
   * Mesh class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {!Object} initialState Required initial state.
   */

  constructor(ctx, initialState = {}) {
    if (false == initialState.geometry instanceof Geometry) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }

    /**
     * Mesh shader attributes.
     */

    const {attributes = new MeshAttributes(ctx, initialState)} = initialState

    /**
     * Mesh shader uniforms.
     */

    const {uniforms = new MeshUniforms(ctx, initialState)} = initialState

    /**
     * Mesh context.
     */

    const {context = new MeshContext(ctx, initialState)} = initialState

    /**
     * Mesh state.
     */

    const {state = new MeshState(ctx, initialState)} = initialState

    /**
     * Optional update function.
     */

    const {update: updateMesh = ({}, f) => f()} = initialState

    /**
     * Regl contest.
     */

    const injectContext = ctx.regl({context})

    /**
     * Mesh draw command.
     */

    const draw = ctx.regl({
      ...state,
      attributes,
      uniforms,
    })

    super(ctx, { ...initialState, context, update })
    incrementStat('Mesh')
    assignTypeName(this, 'mesh')

    /**
     * Draws mesh and with given state and
     * then calling an optional given block
     */

    function update({}, state, block) {
      injectContext(state, (...args) => {
        const {visible} = args[0]
        updateMesh(state, () => {
          if (false === state.visible) {
            draw(state, block)
          } else if (false != state.draw) {
            draw(state)
            block(...args)
          } else {
            draw(state, block)
          }
        })
      })
    }
  }
}

/**
 * Object3DContext class that represents an injected regl context.
 *
 * @public
 * @class MeshContext
 * @see {@link Object3DContext}
 */

export class MeshContext extends Object3DContext {

  /**
   * MeshContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState = {}) {
    super(ctx, initialState)

    const {geometry} = initialState

    // protected properties
    Object.defineProperties(this, {
      computedBoundingBox: {
        enumerable: false,
        writable: true,
        value: null
      },

      computedSize: {
        enumerable: false,
        writable: true,
        value: null
      },

      computedSize: {
        enumerable: false,
        writable: true,
        value: null
      },
    })

    /**
     * The underlying geometry that wraps a simplicial complex
     * that is given as shader attribute input.
     *
     * @public
     * @type {Geometry}
     */

    this.geometry = geometry

    /**
     * A computed bounding box for a mesh.
     *
     * @public
     * @type {Array<Vector>}
     */

    this.boundingBox = (...args) => {
      return this.computeBoundingBox(...args)
    }

    /**
     * A computed size represented for a mesh.
     *
     * @public
     * @type {Vector}
     */

    this.size = (...args) => {
      return this.computeSize(...args)
    }

    /**
     * Visibility boolean
     *
     * @public
     * @type {Boolean}
     */

    this.visible = ({}, {visible} = {}) => {
      return coalesce(visible, initialState.visible, true)
    }
  }

  /**
   * Function to compute the bounding box of the internal
   * geometry. The bounding box is computed once and cached.
   *
   * @public
   * @method
   * @param {Boolean} force
   */

  computeBoundingBox(force = false) {
    if (null == this.geometry) { return null }
    if (true == force || null == this.computedBoundingBox) {
      this.computedBoundingBox = this.geometry.computeBoundingBox()
    }
    return this.computedBoundingBox
  }

  /**
   * Function to compute the size of the geometry with
   * respect to scaling and dimension.
   *
   * @public
   * @method
   * @param {?Object} opts
   * @param {?Number} opts.scale - default is 1
   *
   */

  computeSize({scale = 1} = {}) {
    if (null == this.geometry) {
      return null
    } else if (this.computedSize) {
      return this.computedSize
    }

    this.computeBoundingBox()

    const boundingBox = this.computedBoundingBox
    const dimension = boundingBox[0].length
    const min = boundingBox[0]
    const max = boundingBox[1]
    let size = null

    switch (dimension) {
      case 3: size = vec3.subtract(new Vector3(), max, min); break
      case 2: size = vec2.subtract(new Vector2(), max, min); break
      default: return null
    }

    switch (dimension) {
      case 3: vec3.multiply(size, size, scale); break
      case 2: vec2.multiply(size, size, scale); break
    }

    this.computedSize = size
  }
}

/**
 * MeshState class.
 *
 * @public
 * @class MeshState
*/

export class MeshState {
  /**
   * MeshState class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState) {
    let {
      frag: fragmentShader = null,
      vert: vertexShader = kDefaultMeshVertexShader,
      geometry = null,
      vertexShaderTransform,
    } = initialState

    // shader defines injected into vertex shader
    const shaderDefines = {
      ...initialState.shaderDefines
    }

    if (geometry.positions) {
      shaderDefines['HAS_POSITIONS'] = 1
    }

    if (geometry.normals) {
      shaderDefines['HAS_NORMALS'] = 1
    }

    if (geometry.uvs) {
      shaderDefines['HAS_UVS'] = 1
    }

    if ('string' == typeof vertexShaderTransform) {
      shaderDefines['HAS_TRANSFORM_FUNC'] = 1
      if ('string' == typeof vertexShader) {
        vertexShader = vertexShader
          .replace('TRANSFORM_FUNC_SOURCE', vertexShaderTransform)
      }
    }

    /**
     * Mesh vertex shader source.
     *
     * @public
     * @type {String}
     */

    this.vert =
      'string' == typeof vertexShader
      ? injectDefines(vertexShader, shaderDefines)
      : null

    /**
     * Optional mesh fragment shader source.
     *
     * @public
     * @type {String|undefined}
     */

    this.frag =
      'string' == typeof fragmentShader
      ? injectDefines(fragmentShader, shaderDefines)
      : null

    /**
     * The line width value used for wireframe meshes.
     *
     * @public
     * @type {Number}
     */

    this.lineWidth = ({}, {
      wireframeThickness = initialState.wireframeThickness,
      lineWidth = 1,
    } = {}) => {
      return Math.max(1, coalesce(
        wireframeThickness,
        lineWidth,
        kDefaultMeshWireframeThickness))
    }

    /**
     * The mesh drawing primitive.
     *
     * @public
     * @type {String}
     */

    this.primitive = ({}, {
      primitive = null,
      wireframe = false,
    } = {}) => {
      if ('string' == typeof primitive) {
        return primitive
      } else if (wireframe) {
        return coalesce(
          initialState.wireframePrimitive,
          kDefaultMeshWireframePrimitive)
      } else if ('string' == typeof initialState.primitive) {
        return initialState.primitive
      } else {
        return kDefaultMeshPrimitive
      }
    }

    /**
     * Mesh elements array if geometry provides cells.
     *
     * @public
     * @type {Array|null}
     */

    this.elements = !geometry || !geometry.cells ? null : (({}, {
      wireframe = initialState.wireframe,
      count = initialState.count,
    } = {}) => {
      let cells = geometry.cells
      if (cells && 'number' == typeof count) {
        count = clamp(Math.floor(count), 0, cells.length)
        cells = cells.slice(0, count)
      }
      return cells
    })

    /**
     * Mesh triangle count if geometry does not provide cells.
     *
     * @public
     * @type {Number|null}
     */

    this.count = !geometry || geometry.cells ? null : (({}, {
      count = geometry.positions.length
    } = {}) => {
      if (null != count) { return count }
      else if (initialState.count) { return initialState.count }
      else if (geometry && geometry.complex) {
        return geometry.positions.length
      } else {
        return null
      }
    })

    // remove null or undefined values
    for (const key in this) {
      if (null == this[key]) {
        delete this[key]
      }
    }
  }
}

/**
 * MeshUniforms class.
 *
 * @public
 * @class MeshUniforms
 */

export class MeshUniforms {

  /**
   * MeshUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState) {

    /**
     * Mesh model matrix uniform.
     *
     * @public
     * @type {Array<Number>}
     */

    this['mesh.model'] = ({transform}) => {
      return transform || kMat4Identity
    }

    /**
     * Mesh model normal matrix uniform.
     *
     * @public
     * @type {Array<Number>}
     */

    this['mesh.modelNormal'] = ({transform}) => {
      if (isArrayLike(transform)) {
        return mat3.normalFromMat4([], transform) || kMat3Identity
      } else {
        return kMat3Identity
      }
    }

    /**
     * Mesh fallback opacity uniform value.
     *
     * @public
     * @type {Number}
     * @TODO - figure out a better fallback here and in the shader.
     */

    // at least enough for flat shading incase a material isn't given
    this['material.opacity'] =
      ({opacity: contextOpacity}, {opacity = contextOpacity} = {}) => {
        return coalesce(opacity, 1)
      }

    /**
     * Mesh fallback color uniform value.
     *
     * @public
     * @type {Array<Number>}
     * @TODO - figure out a better fallback here and in the shader.
     */

    this['material.color'] =
      ({color: contextColor}, {color = contextColor} = {}) => {
        return ensureRGBA(color)
      }

    // remove null or undefined values
    for (const key in this) {
      if (null == this[key]) {
        delete this[key]
      }
    }
  }
}

/**
 * MeshAttributes class.
 *
 * @public
 * @class MeshAttributes
*/

export class MeshAttributes {

  /**
   * MeshAttributes class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {!Object} initialState
  */

  constructor(ctx, initialState) {
    const {geometry} = initialState

    /**
     * 'position' vertex attributes value.
     *
     * @public
     * @type {Array<Array<Number>>|Array<Vector3>|null}
     */

    this.position = coalesce(geometry.positions, null)

    /**
     * 'position' vertex attributes value.
     *
     * @public
     * @type {Array<Array<Number>>|Array<Vector3>|null}
     */

    this.normal = coalesce(geometry.normals, null)

    /**
     * 'position' vertex attributes value.
     *
     * @public
     * @type {Array<Array<Number>>|Array<Vector2>|null}
     */

    this.uv = coalesce(geometry.uvs, null)

    // remove null or undefined values
    for (const key in this) {
      if (null == this[key]) {
        delete this[key]
      }
    }
  }
}
