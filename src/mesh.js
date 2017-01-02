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
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

import {
  Quaternion,
  Vector,
} from './math'

const identity = mat4.identity([])

const kDefaultMeshComplexWireframePrimitive = 'triangles'
const kDefaultMeshWireframePrimitive = 'line strip'
const kDefaultWireframeThickness = 0.0125
const kDefaultMeshPrimitive = 'triangles'
const kDefaultVertexShader = glslify(__dirname + '/glsl/mesh/vert.glsl')

/**
 * MeshCommand constructor.
 * @see MeshCommand
 */

module.exports = exports = (...args) => new MeshCommand(...args)
export class MeshCommand extends Object3DCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('Mesh')

    let {
      regl: reglOptions = {},
      vert: vertexShader = kDefaultVertexShader,

      attributes = {},
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

    // shader unifors
    const uniforms = {
      model: ({transform}) => transform || identity,

      wireframeThickness: ({}, {
        wireframeThickness = initial.wireframeThickness
      } = {}) => {
        return wireframeThickness
      },

      wireframe: ({}, {
        wireframe = initial.wireframe
      } = {}) => {
        return Boolean(wireframe)
      }
    }

    // regl context
    const context = {
      ...reglOptions.context,

      get boundingBox() { return () => computeBoundingBox() },
      get geometry() { return geometry || null },
      get size() { return () => computeSize() },
    }

    Object.assign(reglOptions, {context})

    // configure vertex shader if a geometry with a
    // simpicial complex is given
    if (geometry) {
      if (!(geometry instanceof Geometry)) {
        // coerce to usable geometry
        geometry = new Geometry({complex: geometry})
      }

      Object.assign(reglOptions, {
        attributes,
        uniforms,
      })

      // shader defines injected into vertex shader
      const shaderDefines = {}

      // helper function to set attribute that dynamically
      // selects wireframe complex or mesh complex
      const attr = (name, macro, fallback = () => void 0) => {
        const pl = n => `${n}s`
        const w = geometry.wireframe
        const p = geometry.complex
        const maybe = (a) => a && a.length ? a : null
        if (maybe(w[pl(name)]) || maybe(p[pl(name)])) {
          shaderDefines[macro] = ''
          attributes[name] = ({}, args = {}) => {
            const {wireframe = initial.wireframe} = args
            if (wireframe) {
              return maybe(w[pl(name)]) || maybe(fallback(args)) || maybe(p[pl(name)]) || null
            } else {
              return maybe(p[pl(name)]) || maybe(fallback(args)) || maybe(w[pl(name)]) || null
            }
          }
        }
      }

      // vertex attributes defined with macro #ifdef ... #endif
      // wrapper
      attr('nextPosition', 'HAS_NEXT_POSITIONS')
      attr('direction', 'HAS_DIRECTIONS')
      attr('position', 'HAS_POSITIONS')
      attr('normal', 'HAS_NORMALS')
      attr('uv', 'HAS_UVS', ({wireframe = initial.wireframe} = {}) => {
        if (wireframe && geometry.wireframe) {
          return geometry.wireframe.positions.map((p) => p.slice(0, 2))
        } else {
          return geometry.complex.positions.map((p) => p.slice(0, 2))
        }
      })

      Object.assign(reglOptions, {
        primitive: geometry && (({}, {
          primitive: inputPrimitive = null,
          wireframe = false,
        } = {}) => {
          if (inputPrimitive) {
            return inputPrimitive
          } else if (wireframe) {
            if (geometry.wireframe && geometry.wireframe.positions.length) {
              return kDefaultMeshComplexWireframePrimitive
            } else {
              return kDefaultMeshWireframePrimitive
            }
          } else if ('string' == typeof primitive) {
            return primitive
          } else {
            return kDefaultMeshPrimitive
          }
        })
      })

      if (geometry.complex.cells) {
        Object.assign(reglOptions, {
          elements: ({}, {
            wireframe = initial.wireframe,
            count = initial.count,
          } = {}) => {
            let cells = null
            if (wireframe && geometry.wireframe && geometry.wireframe.cells) {
              cells = geometry.wireframe.cells
            } else if (geometry && geometry.complex.cells) {
              cells = geometry.complex.cells
            }

            if (cells) {
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
              return geometry.complex.positions.length
            } else {
              return null
            }
          }
        })
      }

      if (vertexShader) {
        reglOptions.vert = injectDefines(vertexShader, shaderDefines)
      }

      for (let key in reglOptions) {
        if (undefined === reglOptions[key]) {
          delete reglOptions[key]
        }
      }

      if (geometry) {
        draw = ctx.regl(reglOptions)
      }
    }

    super(ctx, {
      ...initialState,

      // Draws mesh and with given state and
      // then calling an optional given block
      draw(state = {}, block = () => void 0) {
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
          void (state[name] || initialState[name] || noop)({ ...state })

        if (null == ctx.reglContext) {
          block({ ...(ctx.reglContext || {}) })
        } else {
          if (false != state.draw) {
            hook('beforeDraw')
            draw(state)
            hook('afterDraw')
            block({ ...ctx.reglContext })
          } else {
            draw(state, () => { block({ ...ctx.reglContext }) })
          }
        }
      }
    })

    //
    // Function to compute the bounding box of the internal
    // geometry. The original simpicial complex is used, not
    // the wireframe complex. The bounding box is computed once
    // and cached.
    //
    function computeBoundingBox() {
      if (geometry && null == boundingBox) {
        boundingBox = (
          getBoundingBox(geometry.positions)
          .map((p) => new Vector(...p))
        )
      }

      return boundingBox
    }

    //
    // Function to compute the size of the geometry with
    // respect to scaling and dimension
    //
    function computeSize() {
      if (null == geometry) {
        return null
      }

      computeBoundingBox()

      const dimension = boundingBox[0].length
      const {scale} = ctx.reglContext // scale is injected by `Object3DCommand`
      const min = boundingBox[0]
      const max = boundingBox[1]
      let size = null

      switch (dimension) {
        case 3: size = vec3.subtract(new Vector(0, 0, 0), max, min); break
        case 2: size = vec2.subtract(new Vector(0, 0), max, min); break
        default: return null
      }

      switch (dimension) {
        case 3: return vec3.multiply(size, size, scale)
        case 2: return vec2.multiply(size, size, scale)
      }
    }
  }
}
