'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from '../math'
import { Object3DCommand } from '../object'
import { $reglContext } from '../symbols'
import getBoundingBox from 'bound-points'
import injectDefines from 'glsl-inject-defines'
import { define } from '../utils'
import coalesce from 'defined'
import glslify from 'glslify'
import clamp from 'clamp'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

const identity = mat4.identity([])

export const DEFAULT_VERTEX_SHADER = glslify(__dirname + '/../glsl/mesh/vert.glsl')
export const DEFAULT_FRAGMENT_SHADER = glslify(__dirname + '/../glsl/mesh/frag.glsl')

/**
 * MeshCommand constructor.
 * @see MeshCommand
 */

module.exports = exports = (...args) => new MeshCommand(...args)

/**
 * MeshCommand class.
 *
 * @public
 * @class MeshCommand
 * @extends Command
 */

export class MeshCommand extends Object3DCommand {

  /**
   * MeshCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    const reglOptions = { ...opts.regl }

    let boundingBox = null
    let render = null
    let draw = opts.draw || null
    let map = opts.map

    let wireframeThickness = coalesce(opts.wireframeThickness, 0.0125)
    let wireframe = true === opts.wireframe ? true : false
    let geometry = opts.geometry || null
    let opacity = opts.opacity || 1
    let color = new Vector(...(opts.color || [197/255, 148/255, 149/255, 1]))

    const cull = {
      enable: false,
      face: 'back',
      ...opts.cull
    }

    const depth = {
      enable: true,
      range: [0, 1],
      mask: true,
      func: 'less',
      ...opts.depth,
    }

    const blend = {
      equation: 'add',
      enable: false,
      color: [0, 0, 0, 0],
      func: {src: 'src alpha', dst: 'one minus src alpha'},
      ...opts.blend,
    }

    const initial = {
      wireframeThickness: wireframeThickness,
      wireframe: wireframe,
      opacity: opacity,
      color: [...color],
      depth: {...depth},
      blend: {...blend},
      cull: {...cull},
      map: map
    }

    const update = (state) => {
      let needsUpdate = false

      Object.assign(depth, initial.depth)
      Object.assign(blend, initial.blend)
      Object.assign(cull, initial.cull)
      vec4.copy(color, initial.color)

      if (state.color) {
        vec4.copy(color, state.color)
      }

      if (wireframe != state.wireframe &&
          'boolean' == typeof state.wireframe) {
        wireframe = state.wireframe
      } else if (wireframe != initial.wireframe) {
        wireframe = initial.wireframe
      }

      if (opacity != state.opacity &&
         'number' == typeof state.opacity ) {
        opacity = state.opacity
      } else if (opacity != initial.opacity) {
        opacity = initial.opacity
      }

      if (wireframeThickness != state.wireframeThickness &&
         'number' == typeof state.wireframeThickness ) {
        wireframeThickness = state.wireframeThickness
      } else if (wireframeThickness != initial.wireframeThickness) {
        wireframeThickness = initial.wireframeThickness
      }

      //
      if (state.map && map != state.map) {
        map = state.map
        needsUpdate = true
      } else {
        // map not set with initial map somehow
        if (null == map && initial.map) {
          map = initial.map
          needsUpdate = true
        }
      }

      if (needsUpdate) {
        configure()
      }
    }

    const computeBoundingBox = () => {
      if (null == geometry) {
        return null
      } else if (boundingBox) {
        return boundingBox
      }

      return (
        boundingBox =
          getBoundingBox(geometry.positions)
          .map((p) => new Vector(...p))
      )
    }

    const computeSize = () => {
      computeBoundingBox()

      if (null == boundingBox) {
        return null
      }

      let size = null
      const dimension = boundingBox[0].length
      const min = boundingBox[0]
      const max = boundingBox[1]

      switch (dimension) {
        case 3: size = vec3.subtract(new Vector(0, 0, 0), max, min); break
        case 2: size = vec2.subtract(new Vector(0, 0), max, min); break
        default: return null
      }

      switch (dimension) {
        case 3: return vec3.multiply(size, size, this.scale)
        case 2: return vec2.multiply(size, size, this.scale)
      }
    }

    const configure = () => {
      // reset draw function
      if (!opts.draw) { draw = null }
      // use regl draw command if draw() function
      // was not provided
      if (false !== draw && 'function' != typeof draw) {
        const elements = geometry ? geometry.complex.cells : undefined
        const attributes = {...opts.attributes}
        const shaderDefines = {}

        const uniforms = {
          ...opts.uniforms,

          wireframeThickness: ({}, {
            wireframeThickness: newWireFrameThickness
          } = {}) => newWireFrameThickness || wireframeThickness,

          wireframe: () => Boolean(wireframe),
          opacity: (ctx, {opacity}) => null != opacity ? opacity : 1,
          aspect: ({aspect}) => aspect  || 1.0,
          color: () => [...(color || [0, 0, 0, 0])],

          // 3d
          projection: ({projection}) => projection  || identity,
          model: ({transform}) => transform || identity,
          view: ({view}) => view  || identity,
        }

        if (geometry) {
          // helper function to set attribute that dynamically
          // selects wireframe simplex or mesh simplex
          const attr = (name, macro) => {
            const pl = n => `${n}s`
            const w = geometry.wireframe
            const p = geometry.complex
            if (p[pl(name)] || w[pl(name)]) {
              shaderDefines[macro] = ''
              attributes[name] = () => {
                if (wireframe) {
                  return (w[pl(name)] || p[pl(name)] || null)
                } else {
                  return (p[pl(name)] || w[pl(name)] || null)
                }
              }
            }
          }

          attr('position', 'HAS_POSITIONS')
          attr('normal', 'HAS_NORMALS')
          attr('uv', 'HAS_UVS')

          attr('nextPosition', 'HAS_NEXT_POSITIONS')
          attr('direction', 'HAS_DIRECTIONS')
        }

        if (map && map.texture) {
          shaderDefines.HAS_MAP = ''
          uniforms.isMapLoaded = () => {
            if ('function' == typeof map) {
              map()
            }

            if (null != map.isDoneLoading && null != map.hasProgress) {
              return Boolean(map.isDoneLoading || map.hasProgress)
            } else {
              return true
            }
          }

          uniforms.map = () => {
            if ('function' == typeof map) { map() }
            return map.texture || map
          }
        } else if (map) {
          map.once('load', () => configure())
        }

        Object.assign(reglOptions, {
          context: {
            ...reglOptions.context,
            geometry: () => geometry || null,
            color: uniforms.color(),
          },

          uniforms, attributes,

          cull: {
            enable: () => cull.enable,
            face: () => cull.face,
          },

          blend: {
            equation: () => blend.equation,
            enable: () => blend.enable,
            color: () => blend.color,
            func: () => blend.func,
          },

          depth: {
            enable: () => depth.enable,
            range: () => depth.range,
            mask: () => depth.mask,
            func: depth.func,
          },

          primitive: null == geometry ? undefined : () => {
            if (wireframe) {
              return geometry.wireframe ? 'triangles' : 'line strip'
            } else if ('string' == typeof opts.primitive) {
              return opts.primitive
            } else {
              return 'triangles'
            }
          }
        })

        if (geometry && geometry.complex.cells) {
          Object.assign(reglOptions, {
            elements: ({}, {count} = {}) => {
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

        } else if (geometry) {
          Object.assign(reglOptions, {
            count: ({}, {count} = {}) => {
              if (null != count) { return count }
              else if (opts.count) { return opts.count }
              else if (geometry && geometry.complex) {
                return geometry.complex.positions.length
              } else {
                return null
              }
            }
          })
        }

        if (null !== opts.frag && false !== opts.frag) {
          reglOptions.frag = opts.frag || DEFAULT_FRAGMENT_SHADER
        }

        if (null !== opts.vert && false !== opts.vert) {
          reglOptions.vert = opts.vert || DEFAULT_VERTEX_SHADER
        }

        if (reglOptions.frag) {
          reglOptions.frag = injectDefines(reglOptions.frag, shaderDefines)
        }

        if (reglOptions.vert) {
          reglOptions.vert = injectDefines(reglOptions.vert, shaderDefines)
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
    }

    super(ctx, {
      ...opts,
      //
      // Draws mesh and with given state and
      // then calling an optional given block
      //
      draw(state = {}, block = () => void 0) {
        const noop = () => void 0

        if ('function' == typeof state) {
          block = state
          state = {}
        }

        state = state || {}
        block = block || noop

        void (state.before || opts.before || noop)({
          ...state,
          wireframe,
          geometry,
          opacity,
          color,
        })

        update(state)

        if (ctx.reglContext) {
          if ('function' == typeof draw) {
            draw(state)
          }
        }

        block(ctx.reglContext || {})

        void (state.after || opts.after || noop)({
          ...state,
          wireframe,
          geometry,
          opacity,
          color,
        })
      }
    })

    //
    // Public properties
    //
    define(this, 'boundingBox', { get: () => computeBoundingBox() })
    define(this, 'geometry', { get: () => geometry })
    define(this, 'color', { get: () => color })
    define(this, 'size', { get: () => computeSize() })

    // initial configuration
    configure()
  }
}
