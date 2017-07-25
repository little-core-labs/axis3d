'use strict'

import { ShaderUniforms, ShaderAttributes, DynamicValue } from './gl'
import { Object3D, Object3DContext} from './object3d'
import { isArrayLike } from '../utils'
import { Geometry } from './geometry'
import { Shader } from './shader'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import clamp from 'clamp'
import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'

const kMat4Identity = mat4.identity([])
const kMat3Identity = mat3.identity([])

export const kDefaultMeshXWireframePrimitive = 'line strip'
export const kDefaultMeshXUniformName = 'mesh'
export const kDefaultMeshXPrimitive = 'triangles'
export const kDefaultMeshXLineWidth = 1

export class MeshX extends Object3D {
  constructor(ctx, initialState = {}) {
    if (false == initialState.geometry instanceof Geometry) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }

    const {attributes = new MeshXAttributes(ctx, initialState)} = initialState
    const {uniforms = new MeshXUniforms(ctx, initialState)} = initialState
    const {context = new MeshXContext(ctx, initialState)} = initialState
    const {shader = new MeshXShader(ctx, initialState)} = initialState
    const {state = new MeshXState(ctx, initialState)} = initialState

    const {update: updateMeshX = ({}, f) => f()} = initialState

    const injectContext = ctx.regl({context})
    const draw = ctx.regl({ ...state, attributes, uniforms, })

    super(ctx, { ...initialState, context, update })
    function update({}, state, block) {
      shader(() => {
        injectContext(state, (...args) => {
          updateMeshX(state, () => {
            draw(state)
            block(...args)
          })
        })
      })
    }
  }
}

export class MeshXContext extends Object3DContext {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
    const {geometry} = initialState

    // protected properties
    Object.defineProperties(this, {
      computedBoundingBox: {enumerable: false, writable: true, value: null},
      computedSize: {enumerable: false, writable: true, value: null},
    })

    this.size = (...args) => this.computeSize(...args)
    this.visible = ({}, {visible} = {}) => coalesce(visible, initialState.visible, true)
    this.geometry = geometry
    this.boundingBox = (...args) => this.computeBoundingBox(...args)
  }

  computeBoundingBox() {
    const force = arguments[0]
    if (null == this.geometry) { return null }
    if (true == force || null == this.computedBoundingBox) {
      this.computedBoundingBox = this.geometry.computeBoundingBox()
    }
    return this.computedBoundingBox
  }

  computeSize({scale = 1} = {}) {
    if (null == this.geometry) {
      return null
    } else if (this.computedSize) {
      return this.computedSize
    }

    this.computeBoundingBox()

    const boundingBox = this.computedBoundingBox
    const dimension = boundingBox && boundingBox[0].length
    const min = boundingBox[0]
    const max = boundingBox[1]
    let size = null

    switch (dimension) {
      case 3: size = vec3.subtract([], max, min); break
      case 2: size = vec2.subtract([], max, min); break
      default: return null
    }

    switch (dimension) {
      case 3: vec3.multiply(size, size, scale); break
      case 2: vec2.multiply(size, size, scale); break
    }

    this.computedSize = size
  }
}

export class MeshXShader extends Shader {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMeshXUniformName} = initialState
    super(ctx, {
      vertexShader: `
      #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
      #include <camera/camera>
      #include <mesh/vertex>
      #include <mesh/mesh>

      #include <camera/uniforms>
      #include <mesh/uniforms>

      #include <vertex/attributes/position>
      #include <vertex/attributes/normal>
      #include <vertex/attributes/uv>
      #include <vertex/main>

      void Main(inout vec4 vertexPosition, inout VaryingData data) {
        vertexPosition = MeshVertex(
          camera.projection,
          camera.view,
          ${uniformName}.model,
          position);
      }
  `,
    })
  }
}

export class MeshXUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMeshXUniformName} = initialState
    super(ctx)
    this.set({
      [`${uniformName}.position`]: this.contextOrArgument('position', null, [0, 0, 0]),
      [`${uniformName}.rotation`]: this.contextOrArgument('rotation', null, [0, 0, 0, 1]),
      [`${uniformName}.scale`]: this.contextOrArgument('scale', null, [1, 1, 1]),

      [`${uniformName}.modelNormal`]: ({transform}) =>
        isArrayLike(transform)
          ? mat3.normalFromMat4([], transform) || kMat3Identity
          : kMat3Identity,

      [`${uniformName}.model`]: ({transform}) =>
        isArrayLike(transform)
          ? transform
          : kMat4Identity,
    })
  }
}

export class MeshXAttributes extends ShaderAttributes {
  constructor(ctx, initialState) {
    const {geometry} = initialState
    super(ctx)
    this.set({
      position: coalesce(geometry.positions, null),
      normal: coalesce(geometry.normals, null),
      uv: coalesce(geometry.uvs, null),
    })
  }
}

export class MeshXState extends DynamicValue {
  constructor(ctx, initialState) {
    super(ctx)
    let { geometry = null } = initialState
    this.set({
      lineWidth({}, {lineWidth} = {}) {
        return Math.max(1, coalesce(lineWidth, kDefaultMeshXLineWidth))
      },

      primitive({}, {primitive, wireframe} = {}) {
        wireframe = coalesce(wireframe, initialState.wireframe, false)
        if (wireframe) {
          return coalesce(
            initialState.wireframePrimitive,
            kDefaultMeshXWireframePrimitive)
        } else if ('string' == typeof primitive) {
          return primitive
        } else if ('string' == typeof initialState.primitive) {
          return initialState.primitive
        } else {
          return kDefaultMeshXPrimitive
        }
      }
    })

    if (geometry && geometry.cells) {
      this.set({
        elements({}, {count} = {}) {
          count = coalesce(count, initialState.count)
          let cells = geometry.cells
          if (cells && 'number' == typeof count) {
            count = clamp(Math.floor(count), 0, cells.length)
            cells = cells.slice(0, count)
          }
          return cells
        },

        count({}, {count} = {}) {
          count = coalesce(count, initialState.count, geometry.positions.length)
          if (null != count) { return count }
          else if (initialState.count) { return initialState.count }
          else if (geometry && geometry.complex) {
            return geometry.positions.length
          } else {
            return null
          }
        }
      })
    }
  }
}
