'use strict'

import { ShaderUniforms, ShaderAttributes } from './gl'
import { ensureRGBA, define, isArrayLike } from '../utils'
import { Object3D, Object3DContext} from './object3d'
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

export const kDefaultMeshXWireframePrimitive = 'line strip'
export const kDefaultMeshXWireframeThickness = 1
export const kDefaultMeshXPrimitive = 'triangles'
export const kDefaultMeshXVertexShader =
  glslify(__dirname+'/../glsl/mesh/vert.glsl')

export class MeshX extends Object3D {
  constructor(ctx, initialState = {}) {
    if (false == initialState.geometry instanceof Geometry) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }

    const {attributes = new MeshXAttributes(ctx, initialState)} = initialState
    const {uniforms = new MeshXUniforms(ctx, initialState)} = initialState
    const {context = new MeshXContext(ctx, initialState)} = initialState
    const {state = new MeshXState(ctx, initialState)} = initialState
    const {update: updateMeshX = ({}, f) => f()} = initialState
    const injectContext = ctx.regl({context})
    const draw = ctx.regl({ ...state, attributes, uniforms, })

    super(ctx, { ...initialState, context, update })
    incrementStat('MeshX')
    assignTypeName(this, 'mesh')

    function update({}, state, block) {
      injectContext(state, (...args) => {
        const {visible} = args[0]
        updateMeshX(state, () => {
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

export class MeshXState {
  constructor(ctx, initialState) {
    let {
      fragmentShader = null,
      vertexShader = kDefaultMeshXVertexShader,
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

    this.lineWidth = ({}, {
      wireframeThickness = initialState.wireframeThickness,
      lineWidth = 1,
    } = {}) => {
      return Math.max(1, coalesce(
        wireframeThickness,
        lineWidth,
        kDefaultMeshXWireframeThickness))
    }

    this.primitive = ({}, {
      primitive = null,
      wireframe = coalesce(initialState.wireframe, false)
    } = {}) => {
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

export class MeshXUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.set({
      'mesh.position': this.contextOrArgument('position', null, [0, 0, 0]),
      'mesh.rotation': this.contextOrArgument('rotation', null, [0, 0, 0, 1]),
      'mesh.scale': this.contextOrArgument('scale', null, [1, 1, 1]),
      'mesh.modelNormal': ({transform}) =>
        isArrayLike(transform)
          ? mat3.normalFromMat4([], transform) || kMat3Identity
          : kMat3Identity,
      'mesh.model': ({transform}) =>
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
