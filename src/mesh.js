'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from './math'
import { $reglContext } from './symbols'
import getBoundingBox from 'bound-points'
import injectDefines from 'glsl-inject-defines'
import { Command } from './command'
import { define } from './utils'
import glslify from 'glslify'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

/**
 * Default vertex shader for a mesh.
 *
 * @public
 * @const
 * @type {String}
 */

export const DEFAULT_VERTEX_SHADER = glslify(__dirname + '/glsl/mesh/vert.glsl')

/**
 * Default fragment shader for a mesh.
 *
 * @public
 * @const
 * @type {String}
 */

export const DEFAULT_FRAGMENT_SHADER = glslify(__dirname + '/glsl/mesh/frag.glsl')

/**
 * Current mesh command counter.
 *
 * @type {Number}
 */

let MESH_COMMAND_COUNTER = 0

/**
 * MeshCommand constructor.
 * @see MeshCommand
 */

export default (...args) => new MeshCommand(...args)

/**
 * MeshCommand class.
 *
 * @public
 * @class MeshCommand
 * @extends Command
 */

export class MeshCommand extends Command {

  /**
   * Returns the next mesh D
   *
   * @public
   * @static
   * @return {Number}
   */

  static id() {
    return MESH_COMMAND_COUNTER ++
  }

  /**
   * MeshCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    const reglOptions = { ...opts.regl }
    const defaults = { ...opts.defaults }
    const model = mat4.identity([])

    let hasInitialUpdate = false
    let boundingBox = null
    let blending = opts.blending || null
    let render = null
    let envmap = null
    let depth = opts.depth || null
    let draw = opts.draw || null
    let map = null

    const previous = {
      rotation: new Quaternion(0, 0, 0, 1),
      position: new Vector(0, 0, 0),
      opacity: 1,
      scale: new Vector(1, 1, 1),
      color: new Vector(0, 0, 0, 0),
    }

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
      if ('scale' in state) {
        vec3.copy(this.scale, state.scale)
      }

      if ('position' in state) {
        vec3.copy(this.position, state.position)
      }

      if ('rotation' in state) {
        quat.copy(this.rotation, state.rotation)
      }

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

      if (envmap) {
        if (this.scale.x >= 0) {
          this.scale.x *= -1
        }

        // @TODO(werle) flipY should be exposed from texture constructor
        if (envmap.texture && envmap.texture._texture.flipY) {
          this.scale.y *= -1
        }
      }

      // update uniform model matrix
      mat4.identity(model)
      mat4.scale(model, model, this.scale)
      mat4.translate(model, model, this.position)
      mat4.multiply(model, model, mat4.fromQuat([], this.rotation))

      // apply and set contextual transform
      if (ctx.previous && ctx.previous.id != this.id) {
        mat4.multiply(this.transform, ctx.previous.transform, model)
        mat4.copy(model, this.transform)
      } else {
        mat4.copy(this.transform, model)
      }
    }

    /**
     * Configures mesh state. This function
     * may create a new render function from regl
     *
     * @private
     */

    const configure = () => {
      const self = this
      if (!self) { return }
      // reset draw function
      if (!opts.draw) { draw = null }
      // use regl draw command if draw() function
      // was not provided
      if (false !== draw && 'function' != typeof draw) {
        const geometry = opts.geometry || null
        const elements = geometry ? geometry.primitive.cells : undefined
        const attributes = {...opts.attributes}
        const shaderDefines = {}

        const uniforms = {
          ...opts.uniforms,
          opacity() {
            return null != self.opacity ? parseFloat(self.opacity) : 1
          },
          color() { return self.color ? self.color.elements : [0, 0, 0, 0]},
          model() { return model },
        }

        defaults.primitive = opts.primitive || 'triangles'

        if (geometry && !this.geometry) {
          this.geometry = geometry
        }

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
            if ('function' == typeof map) { map() }
            return Boolean(map.isDoneLoading || map.hasProgress)
          }
          uniforms.map = () => {
            if ('function' == typeof map) { map() }
            return map.texture
          }
        } else if (map) {
          map.once('load', () => configure())
        }

        if (!opts.primitive && opts.wireframe) {
          opts.primitive = 'lines'
        }

        Object.assign(reglOptions, {
          context: {
            ...reglOptions.context,
            color: uniforms.color(),
            model: uniforms.model(),
          },

          uniforms, attributes,
          vert: undefined !== opts.vert ? opts.vert : DEFAULT_VERTEX_SHADER,
          frag: undefined !== opts.frag ? opts.frag : DEFAULT_FRAGMENT_SHADER,
          depth: null != depth ? depth : {enable: true},
          blend: null != blending ? blending : {
            enable: true,
            func: {
              src: 'src alpha',
              dst: 'one minus src alpha'
            },
          },
          primitive: null == geometry ? undefined : () => {
            if (this.wireframe) { return 'lines' }
            else if (opts.primitive) { return opts.primitive }
            else { return defaults.primitive }
          }
        })

        if (geometry) {
          Object.assign(reglOptions, {
            elements: geometry && geometry.cells || function (ctx, props) {
              props = props || {}
              return props.elements || geometry ? geometry.cells : null
            },
          })

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

        if (this.geometry && reglOptions.vert && reglOptions.frag) {
          draw = ctx.regl(reglOptions)
        }
      }

      // configure render command
      render = opts.render || ((_, state = {}, next = () => void 0) => {
        let args = null

        ctx.push(this)

        if ('function' == typeof state) {
          args = [{...defaults}]
          next = state
          state = {}
        } else if (Array.isArray(state)) {
          args = [state.map((o) => Object.assign({...defaults}, o))]
        } else {
          args = [{...defaults, ...state}]
        }

        const props = Array.isArray(state)
          ? state.map((o) => ({ ...defaults, ...o }))
          : ({...defaults, ...state})

        const block = () => {
          next({...(ctx[$reglContext] || {}), ...reglOptions.context })
        }

        opts.before && opts.before(...args)
        update(...args)
        draw(props)
        block()
        opts.after && opts.after({...defaults, ...state}, block)
        ctx.pop()
      })
    }

    // calls current target  render function
    super((...args) => render(...args))

    /**
     * Mesh ID.
     *
     * @type {Number}
     */

    this.id = opts.id || MeshCommand.id()

    /**
     * Mesh type name.
     *
     * @type {String}
     */

    this.type = opts.type || 'object'

    /**
     * Mesh scale vector.
     *
     * @type {Vector}
     */

    this.scale = opts.scale ?
      new Vector(...opts.scale) :
      new Vector(1, 1, 1)

    /**
     * Mesh position vector.
     *
     * @type {Vector}
     */

    this.position = opts.position ?
      new Vector(...opts.position) :
      new Vector(0, 0, 0)

    /**
     * Mesh rotation quaternion
     *
     * @type {Quaternion}
     */

    this.rotation = opts.rotation ?
      new Quaternion(...opts.rotation) :
      new Quaternion()

    /**
     * Mesh transform matrix
     *
     * @type {Array}
     */

    this.transform = mat4.identity([])

    /**
     * Boolean to indicate if mesh should be drawn
     * with a line primitive.
     *
     * @type {Boolean}
     */

    this.wireframe = false

    /**
     * Mesh color property.
     *
     * @type {Vector}
     */

    this.color = opts.color ?
      new Vector(...opts.color) :
      new Vector(197/255, 148/255, 149/255, 1.0)

    /**
     * Mesh opacity.
     *
     * @type {Number}
     */

    this.opacity = opts.opacity || 1

    /**
     * Computed bounding
     *
     * @type {Array<Vector>}
     */

    define(this, 'boundingBox', {
      get() {
        if (null == this.geometry) {
          return null
        } else if (boundingBox) {
          return boundingBox
        }

        boundingBox =
          getBoundingBox(this.geometry.positions).map((p) => new Vector(...p))
        return boundingBox
      }
    })

    /**
     * Computed size.
     *
     * @type {Vector}
     */

    define(this, 'size', {
      get() {
        // trigger compute with getter
        if (null == this.boundingBox) {
          return null
        }

        const min = boundingBox[0]
        const max = boundingBox[1]
        const dimension = boundingBox[0].length

        switch (dimension) {
          case 3: return vec3.subtract(new Vector(0, 0, 0), max, min)
          case 2: return vec2.subtract(new Vector(0, 0, 0), max, min)
          default: return null
        }
      }
    })

    /**
     * Mesh texture map if given.
     *
     * @type {Media}
     */

    define(this, 'map', {
      get: () => map,
      set: (value) => setMap(value)
    })

    /**
     * Mesh texture environment map if given.
     *
     * @type {Media}
     */

    define(this, 'envmap', {
      get: () => envmap,
      set: (value) => setEnvMap(value)
    })

    /**
     * Toggles blending.
     *
     * @type {Boolean|Object}
     */

    define(this, 'blending', {
      get: () => blending,
      set: (value) => {
        blending = value
        configure()
      }
    })

    /**
     * Toggles depth.
     *
     * @type {Boolean|Object}
     */

    define(this, 'depth', {
      get: () => depth,
      set: (value) => {
        depth = value
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
