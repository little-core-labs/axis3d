'use strict'

/**
 * Module dependencies.
 */

import injectDefines from 'glsl-inject-defines'
import { Quaternion, Vector } from '../math'
import { Command } from './command'
import { define } from '../utils'
import glslify from 'glslify'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

/**
 * Default vertex shader for objects.
 *
 * @public
 * @const
 * @type {String}
 */

export const DEFAULT_VERTEX_SHADER = glslify('../glsl/object/vert.glsl')

/**
 * Default fragment shader for objects.
 *
 * @public
 * @const
 * @type {String}
 */

export const DEFAULT_FRAGMENT_SHADER = glslify('../glsl/object/frag.glsl')

/**
 * Current object command counter.
 *
 * @type {Number}
 */

let OBJECT_COMMAND_COUNTER = 0

/**
 * ObjectCommand constructor.
 * @see ObjectCommand
 */

export default (...args) => new ObjectCommand(...args)

/**
 * ObjectCommand class.
 *
 * @public
 * @class ObjectCommand
 * @extends Command
 */

export class ObjectCommand extends Command {

  /**
   * Returns the next object ID
   *
   * @public
   * @static
   * @return {Number}
   */

  static id() {
    return OBJECT_COMMAND_COUNTER ++
  }

  /**
   * ObjectCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    const defaults = {...opts.defaults}
    const model = mat4.identity([])

    let render = null
    let draw = opts.draw || null
    let map = opts.map || null

    /**
     * Updates state and internal matrices.
     *
     * @private
     * @param {(Object)?} state
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

      // update uniform model matrix
      mat4.identity(model)
      mat4.multiply(model, model, mat4.fromQuat([], this.rotation))
      mat4.translate(model, model, this.position)
      mat4.scale(model, model, this.scale)

      // apply and set contextual transform
      if (ctx.previous && ctx.previous.id != this.id) {
        mat4.copy(this.transform, mat4.multiply([], ctx.previous.transform, model))
      } else {
        mat4.copy(this.transform, model)
      }

      // copy transform to uniform model matrix
      mat4.copy(model, this.transform)
    }

    /**
     * Configures object state. This function
     * may create a new render function from regl
     *
     * @private
     */

    const configure = () => {
      // reset draw function
      if (!opts.draw) { draw = null }
      // use regl draw command if draw() function
      // was not provided
      if (!draw) {
        const geometry = opts.geometry || null
        const elements = geometry ? geometry.primitive.cells : undefined
        const attributes = {...opts.attributes}
        const shaderDefines = {}

        const uniforms = {
          ...opts.uniforms,
          color: () => this.color.elements,
          model: (...args) => model
        }

        defaults.count = opts.count || undefined
        defaults.elements = opts.elements || elements || undefined
        defaults.primitive = opts.primitive || 'triangles'

        if (geometry) {
          if (this) {
            this.geometry = geometry
          }

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
        }

        if (map && map.texture) {
          uniforms.map = () => {
            if (map && map.texture) {
              if ('function' == typeof map) { map() }
              return map.texture
            }

            return null
          }
        } else if (map) {
          map.once('load', () => configure())
        }

        if (!opts.primitive && opts.wireframe) {
          opts.primitive = 'lines'
        }

        const reglOptions = {
          ...opts.regl,
          uniforms,
          attributes,
          vert: opts.vert || DEFAULT_VERTEX_SHADER,
          frag: opts.frag || DEFAULT_FRAGMENT_SHADER,
          count: null == opts.count ? undefined : ctx.regl.prop('count'),
          elements: null == elements ? undefined : ctx.regl.prop('elements'),
          primitive: () => {
            if (this.wireframe) { return 'line loop' }
            else { return defaults.primitive }
          }
        }

        if (uniforms.map) {
          shaderDefines.HAS_MAP = ''
        }

        reglOptions.frag = injectDefines(reglOptions.frag, shaderDefines)
        reglOptions.vert = injectDefines(reglOptions.vert, shaderDefines)

        for (let key in reglOptions) {
          if (undefined == reglOptions[key]) {
            delete reglOptions[key]
          }
        }

        draw = ctx.regl(reglOptions)
      }

      // configure render command
      render = opts.render || ((_, state, next = () => void 0) => {
        let args = null

        ctx.push(this)

        if ('function' == typeof state) {
          args = [{...defaults}]
          next = state
        } else if (Array.isArray(state)) {
          args = [state.map((o) => Object.assign({...defaults}, o))]
        } else {
          args = [{...defaults, ...state}]
        }

        if (opts.before) {
          opts.before(...args)
        }

        update(...args)
        draw(...args)
        next(...args)

        if (opts.after) {
          opts.after(...args)
        }

        ctx.pop()
      })
    }

    // initial configuration
    configure()

    // calls current target  render function
    super((...args) => render(...args))

    /**
     * Object ID.
     *
     * @type {Number}
     */

    this.id = opts.id || ObjectCommand.id()

    /**
     * Object type name.
     *
     * @type {String}
     */

    this.type = opts.type || 'object'

    /**
     * Object scale vector.
     *
     * @type {Vector}
     */

    this.scale = opts.scale ?
      new Vector(...opts.scale) :
      new Vector(1, 1, 1)

    /**
     * Object scale vector.
     *
     * @type {Vector}
     */

    this.position = opts.position ?
      new Vector(...opts.position) :
      new Vector(0, 0, 0)

    /**
     * Object rotation quaternion
     *
     * @type {Quaternion}
     */

    this.rotation = opts.rotation ?
      new Quaternion(...opts.rotation) :
      new Quaternion()

    /**
     * Object transform matrix
     *
     * @type {Array}
     */

    this.transform = mat4.identity([])

    /**
     * Boolean to indicate if object should be drawn
     * with a line primitive.
     *
     * @type {Boolean}
     */

    this.wireframe = false

    /**
     * Object color property.
     *
     * @type {Vector}
     */

    this.color = opts.color ?
      new Vector(...opts.color) :
      new Vector(197/255, 148/255, 149/255, 1.0)

    /**
     * Object map if given.
     *
     * @type {Media}
     */

    define(this, 'map', {
      get: () => map,
      set: (value) => {
        if (value && value.texture) {
          map = value
          configure()
        } else if (null == value) {
          map = null
          configure()
        }
      }
    })
  }
}