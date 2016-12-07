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
import glslify from 'glslify'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

const identity = mat4.identity([])

/**
 * Default vertex shader for a mesh.
 *
 * @public
 * @const
 * @type {String}
 */

export const DEFAULT_VERTEX_SHADER = glslify(__dirname + '/../glsl/mesh/vert.glsl')

/**
 * Default fragment shader for a mesh.
 *
 * @public
 * @const
 * @type {String}
 */

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
    const defaults = { ...opts.defaults }

    let boundingBox = null
    let geometry = opts.geometry || null
    let blending = opts.blending || null
    let render = null
    let envmap = null
    let depth = opts.depth || null
    let cull = opts.cull || null
    let draw = opts.draw || null
    let map = null

    /**
     * Sets mesh map.
     *
     * @private
     * @param {Media|null} value
     */

    const setMap = (value) => {
      if (value && value != map) {
        if (value) {
          map = value
          configure()
        }
      } else if (null === value && null != map) {
        map = null
        configure()
      }
    }

    /**
     * Sets environment mesh map.
     *
     * @private
     * @param {Media|null} value
     */

    const setEnvMap = (value) => {
      if (value && value != envmap) {
        if (value) {
          envmap = value
          setMap(envmap)
        }
      } else if (null === value && null != envmap) {
        envmap = null
        setMap(null)
      }
    }

    /**
     * Updates state and internal matrices.
     *
     * @private
     * @param {Object} [state]
     */

    const update = (state) => {
      if ('color' in state) {
        vec4.copy(this.color, state.color)
      }

      if ('wireframe' in state) {
        this.wireframe = Boolean(state.wireframe)
      }

      if ('opacity' in state) {
        this.opacity = state.opacity
      }

      if ('blending' in state) {
        this.blending = state.blending
      }

      if ('map' in state && map != state.map) {
        setMap(state.map)
      } else if ('envmap' in state && envmap != state.envmap) {
        setEnvMap(state.envmap)
      }
    }

    /**
     * Configures mesh state. This function
     * may create a new render function from regl
     *
     * @private
     */

    const configure = () => {
      if (!this) { return }
      // reset draw function
      if (!opts.draw) { draw = null }
      // use regl draw command if draw() function
      // was not provided
      if (false !== draw && 'function' != typeof draw) {
        const elements = geometry ? geometry.primitive.cells : undefined
        const attributes = {...opts.attributes}
        const shaderDefines = {}

        const uniforms = {
          ...opts.uniforms,
          opacity: (ctx, {opacity}) => null != opacity ? opacity : 1,
          color: () => [...(this.color || [0, 0, 0, 0])],

          // 3d
          projection: ({projection}) => projection  || identity,
          model: ({local}) => local || identity,
          view: ({view}) => view  || identity,
        }

        defaults.primitive = opts.primitive || 'triangles'

        if (geometry) {
          if (geometry.primitive.positions) {
            shaderDefines.HAS_POSITIONS = ''
            attributes.position = geometry.primitive.positions
          }

          if (geometry.primitive.normals) {
            shaderDefines.HAS_NORMALS = ''
            attributes.normal = geometry.primitive.normals
          }

          if (geometry.primitive.uvs) {
            shaderDefines.HAS_UVS = ''
            attributes.uv = geometry.primitive.uvs
          }

          if (geometry.wireframe) {
            const wireframe = geometry.wireframe
            if (wireframe.nextPositions) {
              shaderDefines.HAS_NEXT_POSITIONS = ''
              attributes.nextPosition = wireframe.nextPositions
            }

            if (wireframe.directions) {
              shaderDefines.HAS_DIRECTIONS = ''
              attributes.direction = wireframe.directions
            }
          }
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
          //cull: null != cull ? cull : {enable: true},
          depth: null != depth ? depth : {enable: true},
          blend: null != blending ? blending : {
            enable: true,
            func: {
              src: 'src alpha',
              dst: 'one minus src alpha'
            },
          },

          primitive: null == geometry ? undefined : () => {
            if (this.wireframe) { return 'line strip' }
            else if (opts.primitive) { return opts.primitive }
            else { return defaults.primitive }
          }
        })

        if (null !== opts.frag && false !== opts.frag) {
          reglOptions.frag = opts.frag || DEFAULT_FRAGMENT_SHADER
        }

        if (null !== opts.vert && false !== opts.vert) {
          reglOptions.vert = opts.vert || DEFAULT_VERTEX_SHADER
        }

        if (geometry) {
          reglOptions.elements =
            geometry && geometry.cells || function (ctx, props) {
              props = props || {}
              return props.elements || geometry ? geometry.cells : null
            }

          if (opts.count) {
            reglOptions.count = opts.count
          } else if (geometry && geometry.primitive) {
            reglOptions.count = geometry.primitive.count
          }
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

        for (let key in defaults) {
          if (undefined === defaults[key]) {
            delete defaults[key]
          }
        }

        if (geometry) {
          draw = ctx.regl(reglOptions)
        }
      }
    }

    // calls current target render function
    super(ctx, {
      ...opts,
      draw: (state = {}, next = () => void 0) => {
        let args = null
        if ('function' == typeof state) {
          args = [{...defaults}]
          next = state
          state = {}
        } else if (Array.isArray(state)) {
          args = [state.map((o) => Object.assign({...defaults}, o))]
        } else {
          args = [{...defaults, ...state}]
        }

        const noop = () => void 0
        const props = Array.isArray(state)
          ? state.map((o) => ({ ...defaults, ...o }))
          : ({...defaults, ...state})

        const block = () => {
          next({...(ctx[$reglContext] || {}), ...reglOptions.context })
        }

        (state.before || opts.before || noop)(...args);

        update(...args)

        if (ctx.reglContext) {
          draw(props)
        }

        block()

        void (state.after || opts.after || noop)({
          ...defaults,
          ...state
        }, block);
      }
    })

    this.type = 'mesh'
    this.color = new Vector(...(opts.color || [197/255, 148/255, 149/255, 1]))
    this.opacity = opts.opacity || 1
    this.wireframe = null != opts.wireframe ? Boolean(opts.wireframe) : false

    define(this, 'boundingBox', {
      get() {
        if (null == geometry) {
          return null
        } else if (boundingBox) {
          return boundingBox
        }

        boundingBox =
          getBoundingBox(geometry.positions).map((p) => new Vector(...p))
        return boundingBox
      }
    })

    define(this, 'size', {
      get() {
        // trigger compute with getter
        if (null == this.boundingBox) {
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
    })

    define(this, 'geometry', {
      get: () => geometry,
      set: (value) => {
        geometry = value
        configure()
      }
    })

    define(this, 'map', {
      get: () => map,
      set: (value) => setMap(value)
    })

    define(this, 'envmap', {
      get: () => envmap,
      set: (value) => setEnvMap(value)
    })

    define(this, 'blending', {
      get: () => blending,
      set: (value) => {
        blending = value
        configure()
      }
    })

    define(this, 'depth', {
      get: () => depth,
      set: (value) => {
        depth = value
        configure()
      }
    })

    define(this, 'cull', {
      get: () => cull,
      set: (value) => {
        cull = value
        configure()
      }
    })

    // initial configuration
    if (opts.envmap) {
      setEnvMap(opts.envmap)
    } else if (opts.map) {
      setMap(opts.map)
    } else {
      configure()
    }
  }
}
