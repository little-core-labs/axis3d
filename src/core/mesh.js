'use strict'

import { ShaderUniforms, ShaderAttributes, DynamicValue } from './gl'
import { isArrayLike, get } from '../utils'
import { Object3D } from './object3d'
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

export const kDefaultMeshWireframePrimitive = 'line strip'
export const kDefaultMeshUniformName = 'mesh'
export const kDefaultMeshPrimitive = 'triangles'
export const kDefaultMeshLineWidth = 1

export class Mesh extends Object3D {
  static defaults() {
    return {
      wireframePrimitive: 'line strip',
      uniformName: 'mesh',
      primitive: 'triangles',
      lineWidth: 1
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Mesh.defaults(), initialState)

    if (false == initialState.geometry instanceof Geometry) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }

    const attributes = new MeshAttributes(ctx, initialState)
    const uniforms = new MeshUniforms(ctx, initialState)
    const context = new MeshContext(ctx, initialState)
    const shader = new MeshShader(ctx, initialState)
    const state = new MeshState(ctx, initialState)

    const injectContext = ctx.regl({context})
    const draw = ctx.regl({ ...state, attributes, uniforms, })

    super(ctx, {
      ...initialState,
      update(state, block) {
        const {update} = initialState
        const inject = () => injectContext(state, (...args) => {
          draw(state)
          block(...args)
        })
        shader(() => {
          if ('function' == typeof update) { update(state, inject) }
          else { inject() }
        })
      }
    })
  }
}

export class MeshContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    let computedBoundingBox = null
    let computedSize = null
    super(ctx, initialState, {
      geometry() { return geometry },
      size({boundingBox}) {
        if (!boundingBox) { return [0, 0] }
        if (computedSize) { return computedSize }
        const dimension = boundingBox && boundingBox[0].length
        const min = boundingBox[0]
        const max = boundingBox[1]
        switch (dimension) {
          case 3:
            computedSize = []
            vec3.subtract(computedSize, max, min);
            vec3.multiply(computedSize, computedSize, scale);
            break
          case 2:
            vec2.subtract(computedSize, max, min);
            vec2.multiply(computedSize, computedSize, scale);
            break
        }
        return computedSize
      },

      boundingBox() {
        if (!geometry) { return null }
        if (computedBoundingBox) { return computedBoundingBox }
        computedBoundingBox = geometry.computeBoundingBox()
        return computedBoundingBox
      }
    })
  }
}

export class MeshShader extends Shader {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Mesh.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, {
      vertexShader: ({vertexShader}) => vertexShader || `
      #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
      #include <camera/camera>
      #include <mesh/vertex>
      #include <mesh/mesh>

      #include <camera/uniforms>
      #include <mesh/uniforms>

      #include <vertex/attributes/position>
      #include <vertex/attributes/normal>
      #include <vertex/attributes/uv>

      #include <varying/position>
      #include <varying/normal>
      #include <varying/uv>
      #include <varying/emit>

      #include <vertex/main>
      void Main(inout vec4 vertexPosition, inout VaryingData data) {
        vertexPosition = MeshVertex(
          camera.projection,
          camera.view,
          ${uniformName}.model,
          position);
      }

     `,

      ...initialState
    })
  }
}

export class MeshUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Mesh.defaults(), initialState)
    const {uniformName} = initialState
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

export class MeshAttributes extends ShaderAttributes {
  constructor(ctx, initialState) {
    Object.assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    super(ctx, initialState, {
      position: coalesce(geometry.positions, null),
      normal: coalesce(geometry.normals, null),
      uv: coalesce(geometry.uvs, null),
    })
  }
}

export class MeshState extends DynamicValue {
  constructor(ctx, initialState) {
    Object.assign(initialState, Mesh.defaults(), initialState)
    const {geometry} = initialState
    super(ctx, initialState, {
      lineWidth(ctx, args) {
        return Math.max(1, get('lineWidth', [args, ctx, initialState]))
      },

      primitive(ctx, args) {
        if (get('wireframe', [args, ctx, initialState])) {
          return get('wireframePrimitive', [args, ctx, initialState])
        }
        return get('primitive', [args, ctx, initialState])
      }
    })

    if (geometry && geometry.cells) {
      this.set('elements', (ctx, args) => {
        const cells = geometry.cells
        const count = get('count', [args, initialState, ctx])
        if (cells && 'number' == typeof count) {
          return cells.slice(0, clamp(Math.floor(count), 0, cells.length))
        }
        return cells
      })
    } else if (geometry) {
      this.set('count', (ctx, args) => {
        return get('count', [args, initialState, ctx]) || geometry.positions.length
      })
    }
  }
}
