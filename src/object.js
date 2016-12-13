'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from './math'
import { Command } from './command'
import { define } from './utils'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

let OBJECT_COMMAND_COUNTER = 0

/**
 * Object3DCommand constructor.
 * @see Object3DCommand
 */

module.exports = exports = (...args) => new Object3DCommand(...args)

/**
 * Object3DCommand class.
 *
 * @public
 * @class Object3DCommand
 * @extends Command
 */

export class Object3DCommand extends Command {

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
   * Object3DCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}) {
    const draw = opts.draw || function () {}
    const type = opts.type || 'object'
    const id = opts.id || Object3DCommand.id()

    // 3d
    const rotation = new Quaternion(...(opts.rotation || []))
    const position = new Vector(...(opts.position || [0, 0, 0]))
    const scale = new Vector(...(opts.scale || [1, 1, 1]))

    // initial state
    const initial = {
      rotation: [...rotation],
      position: [...position],
      scale: [...scale],
    }

    // world
    const transform = mat4.identity([])
    const model = mat4.identity([])

    // regl context
    const injectContext = ctx.regl({
      context: {
        transform: () => transform,
        model: () => model,
        id: () => id,
      }
    })

    //
    // Updates state and internal matrices.
    //
    const update = (state = {}) => {
      mat4.identity(model)
      mat4.identity(transform)
      vec3.copy(scale, initial.scale)
      vec3.copy(position, initial.position)
      quat.copy(rotation, initial.rotation)

      if (state.scale) {
        if (state.scale.length && 3 == state.scale.length) {
          vec3.copy(scale, state.scale)
        } else {
          Object.assign(scale, state.scale)
        }
      }

      if (state.position) {
        if (state.position.length && 3 == state.position.length) {
          vec3.copy(position, state.position)
        } else {
          Object.assign(position, state.position)
        }
      }

      if (state.rotation) {
        if (state.rotation.length && 4 == state.rotation.length) {
          quat.copy(rotation, state.rotation)
        } else {
          Object.assign(rotation, state.rotation)
        }
      }

      //
      //   M = T * R * S
      //   M' = Mp * M
      //

      // M
      mat4.translate(model, model, position)
      mat4.multiply(model, model, mat4.fromQuat([], rotation))
      mat4.scale(model, model, scale)

      // M'
      const {transform: parentTransform} = ctx.reglContext
      if (parentTransform) {
        mat4.multiply(transform, parentTransform, model)
      } else {
        mat4.copy(transform, model)
      }
    }

    // calls current target  render function
    super((_, state = {}, block = () => void 0) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      // push this command to context stack
      update({...state})
      ctx.push(this)

      // inject context suitable for
      // all Object3DCommand instances
      injectContext(() => {
        // draw object however defined by the
        // extending class calling block as a scoped
        // function
        draw({
          ...state,
          transform,
          position,
          rotation,
          scale,
        }, block)

        // remove this command from the context stack
        ctx.pop()
      })
    })

    //
    // Public properties
    //
    define(this, 'id', { get() { return id } })
    define(this, 'scale', { get() { return scale } })
    define(this, 'position', { get() { return position } })
    define(this, 'rotation', { get() { return rotation } })
    define(this, 'transform', { get() { return transform } })
  }
}
