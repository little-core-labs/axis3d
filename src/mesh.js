'use strict'

/**
 * Module dependencies.
 */

import { Object3DCommand } from './object3d'
import { incrementStat } from './stats'
import getBoundingBox from 'bound-points'
import injectDefines from 'glsl-inject-defines'
import { Geometry } from './geometry'
import { define } from './utils'
import coalesce from 'defined'
import glslify from 'glslify'
import clamp from 'clamp'
import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

import {
  Quaternion,
  Vector,
} from './math'

const identity = mat4.identity([])

const kDefaultMeshWireframePrimitive = 'line strip'
const kDefaultWireframeThickness = 1
const kDefaultMeshPrimitive = 'triangles'
const kDefaultVertexShader = glslify(__dirname + '/glsl/mesh/vert.glsl')

module.exports = exports = (...args) => new MeshCommand(...args)
export class MeshCommand extends Object3DCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('Mesh')

    let {
      regl: reglOptions = {},
      vert: vertexShader = kDefaultVertexShader,
      frag: fragmentShader = null,

      primitive = 'triangles',
      geometry = null,
    } = initialState

    // computed bounding box that is computed once
    // and cached in this variable
    let boundingBox = null

    // draw function created by regl
    // if a geometry is given
    let draw = () => void 0

    // initial configurable state
    const initial = {
      wireframeThickness: (
        initialState.wireframeThickness
        || kDefaultWireframeThickness
      ),

      wireframe: Boolean(initialState.wireframe),
      count: initialState.count || undefined
    }

    const attributes = {}

    // shader uniforms
    const uniforms = {
      model: ({transform}) => transform || identity,
      modelNormal: ({transform}, {} = {}, id) => {
        return (
          transform ?
          mat3.normalFromMat4([], transform) :
          identity
        )
      },

      // at least enough for flat shading incase a material isn't given
      'material.opacity': ({materialOpacity}, {opacity = materialOpacity} = {}) => opacity,
      'material.color': ({materialColor}, {color = materialColor} = {}) => color,
    }

    // regl context
    const context = {
      ...reglOptions.context,

      boundingBox: computeBoundingBox,
      geometry: geometry || null,
      size: computeSize,
    }

    Object.assign(reglOptions, {context})

    // configure vertex shader if a geometry with a
    // simpicial complex is given
    if (geometry) {
      Object.assign(attributes, initialState.attributes)
      Object.assign(uniforms, initialState.uniforms)
      Object.assign(reglOptions, {
        attributes,
        uniforms,
      })

      // shader defines injected into vertex shader
      const shaderDefines = {
        ...initialState.shaderDefines
      }

      if (geometry.positions) {
        attributes.position = geometry.positions
        shaderDefines['HAS_POSITIONS'] = 1
      }

      if (geometry.normals) {
        attributes.normal = geometry.normals
        shaderDefines['HAS_NORMALS'] = 1
      }

      if (geometry.uvs) {
        attributes.uv = geometry.uvs
        shaderDefines['HAS_UVS'] = 1
      }

      Object.assign(reglOptions, {
        primitive: geometry && (({}, {
          primitive: inputPrimitive = null,
          wireframe = false,
        } = {}) => {
          if (inputPrimitive) {
            return inputPrimitive
          } else if (wireframe) {
            return kDefaultMeshWireframePrimitive
          } else if ('string' == typeof primitive) {
            return primitive
          } else {
            return kDefaultMeshPrimitive
          }
        })
      })

      if (geometry.cells) {
        Object.assign(reglOptions, {
          elements: ({}, {
            wireframe = initial.wireframe,
            count = initial.count,
          } = {}) => {
            let cells = geometry.cells
            if (cells && 'number' == typeof count) {
              count = coalesce(count, cells.length)
              count = clamp(Math.floor(count), 0, cells.length)
              cells = cells.slice(0, count)
            }
            return cells
          }
        })
      } else {
        Object.assign(reglOptions, {
          count: ({}, {count} = {}) => {
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

      if ('string' == typeof vertexShader) {
        reglOptions.vert = injectDefines(vertexShader, shaderDefines)
      }

      if ('string' == typeof fragmentShader) {
        reglOptions.frag = injectDefines(fragmentShader, shaderDefines)
      }

      for (let key in reglOptions) {
        if (undefined === reglOptions[key]) {
          delete reglOptions[key]
        }
      }

      if (geometry) {
        draw = ctx.regl({
          lineWidth: ({}, {
            wireframeThickness = initial.wireframeThickness,
            lineWidth = 1,
          } = {}) => {
            return Math.max(wireframeThickness || lineWidth, 1)
          },
          ...reglOptions
        })
      }
    }

    super(ctx, {
      ...initialState,

      // Draws mesh and with given state and
      // then calling an optional given block
      update(state, block) {
        const noop = () => void 0

        if ('function' == typeof state) {
          block = state
          state = {}
        }

        state = state || {}
        block = block || noop

        // helper function to call hook defined on
        // input state falling back to initial state
        const hook = (name) =>
          void (state[name] || initialState[name] || noop)(state)

        const update = initialState.update || (({} = {}, f) => f())

        update(state, () => {
          if (null == ctx.reglContext) {
            block({ ...(ctx.reglContext || {}) })
          } else {
            ctx.reglContext.geometry = geometry
            if (false === state.visible) {
              draw(state, block)
            } else if (false != state.draw) {
              hook('beforeDraw')
              draw(state)
              hook('afterDraw')
              block({ ...ctx.reglContext }, state)
            } else {
              draw(state, block)
            }
            delete ctx.reglContext.geometry
          }
        })
      }
    })

    //
    // Function to compute the bounding box of the internal
    // geometry. The bounding box is computed once and cached.
    //
    function computeBoundingBox({}, {} = {}) {
      return () => {
        if (geometry && null == boundingBox) {
          boundingBox = (
            getBoundingBox(geometry.positions)
            .map((p) => new Vector(...p))
          )
        }

        return boundingBox
      }
    }

    //
    // Function to compute the size of the geometry with
    // respect to scaling and dimension
    //
    function computeSize({scale} = {}, {} = {}) {
      return () => {
        if (null == geometry) {
          return null
        }

        computeBoundingBox()

        const dimension = boundingBox[0].length
        const min = boundingBox[0]
        const max = boundingBox[1]
        let size = null

        switch (dimension) {
          case 3: size = vec3.subtract([], max, min); break
          case 2: size = vec2.subtract([], max, min); break
          default: return null
        }

        switch (dimension) {
          case 3: return vec3.multiply(size, size, scale)
          case 2: return vec2.multiply(size, size, scale)
        }
      }
    }
  }
}
