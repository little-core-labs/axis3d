'use strict'

/**
 * Module dependencies.
 */

import { incrementStat, getStats } from '../stats'
import { assignTypeName } from './types'
import { Quaternion } from '../math'
import { Command } from './command'
import { Vector } from './vector'
import { define } from '../utils'

import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

/**
 * Next available Object3D ID represented
 * as an integer.
 * @private
 */

let OBJECT_COMMAND_NEXT_ID = 0x6f

/**
 * Mat4 identity matrix.
 * @private
 */

const kMat4Identity = mat4.identity([])

/**
 * Object3D is the base command type that most types in
 * Axis3D inherits from that need positional data.
 *
 * @public
 * @class Object3D
 * @extends Command
 */

export class Object3D extends Command {

  /**
   * Returns the next object ID
   *
   * @public
   * @static
   * @method
   * @return {Number}
   */

  static id() {
    return OBJECT_COMMAND_NEXT_ID ++
  }

  /**
   * Returns a count of all Object3D instances.
   *
   * @public
   * @static
   * @method
   * @return {Number}
   */

  static count() {
    const stats = getStats('Object3D')
    return stats ? stats.length : 0
  }

  /**
   * Object3D class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {?Object} initialState Initial state
   * @see {@link Object3DContext}
   */

  constructor(ctx, initialState = {}) {
    super(update)
    incrementStat('Object3D')
    assignTypeName(this, 'object3d')

    /**
     * Optional update function.
     */

    const {update: updateObject = null} = initialState

    if (null != updateObject && 'function' != typeof updateObject) {
      throw new TypeError(
      `Expecting update function to be a function. Got ${typeof updateObject}.`)
    }

    /**
     * The injected regl context.
     */

    const {context = new Object3DContext(ctx, initialState)} = initialState

    // ensure context is a descendant of Object3DContext
    if (false == context instanceof Object3DContext) {
      throw new TypeError("Expecting instance of Object3DContext given.")
    }

    /**
     * Regl context injection function.
     */

    const injectContext = ctx.regl({context})

    /**
     * Calls current target render function
     */

    function update(state, block) {
      // ensure correct values
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      // ensure object
      state = 'object' == typeof state && state ? state : {}

      // ensure function
      block = 'function' == typeof block ? block : function() {}

      // inject Object3D context and call
      // extending update function
      injectContext(state, (ctx, args, id) => {
        if ('function' == typeof updateObject) {
          updateObject(ctx, args || {}, block)
        } else if ('function' == typeof block) {
          block(ctx, args || {})
        }
      })

      return this
    }
  }
}

/**
 * Object3DContext class that represents an injected regl context.
 *
 * @public
 * @class Object3DContext
 * @see {@link Object3D}
 * @see {@link https://github.com/regl-project/regl}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#context}
 */

export class Object3DContext {

  /**
   * Object3DContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState = {}) {
    const {
      computeTransformMatrix = true,
      computeLocalMatrix = true,

      rotation: initialRotation = [0, 0, 0, 1],
      position: initialPosition = [0, 0, 0],
      scale: initialScale = [1, 1, 1],

      id = Object3D.id(),
    } = initialState

    /**
     * World transform matrix.
     */

    const transformMatrix = mat4.identity([])

    /**
     * Local model matrix.
     */

    const localMatrix = mat4.identity([])

    // protected properties
    Object.defineProperties(this, {
      shouldComputeTransformMatrix: {
        enumerable: false,
        value: computeTransformMatrix,
      },

      shouldComputeLocalMatrix: {
        enumerable: false,
        value: computeLocalMatrix,
      },

      // initial state
      initialRotation: { get: () => initialRotation, enumerable: false },
      initialPosition: { get: () => initialPosition, enumerable: false },
      initialScale: { get: () => initialScale, enumerable: false },

      // object matrices
      transformMatrix: { get: () => transformMatrix, enumerable: false},
      localMatrix: { get: () => localMatrix, enumerable: false},
    })

    /**
     * Object3D instance ID.
     *
     * @public
     * @type {Number|String}
     */

    this.id = ({}, args = {}) => {
      args = args || {}
      // no null/undefined
      if (null != args.id) {
        return coalesce(args.id, id)
      } else {
        return id
      }
    }

    /**
     * Object3D scale vector applied to local matrix.
     *
     * @public
     * @type {Array<Number>}
     */

    this.scale = ({}, args = {}) => {
      args = args || {}
      let scale = coalesce(args.scale, initialScale)
      if ('number' == typeof scale) {
        return [scale, scale, scale]
      } else if (scale instanceof Vector) {
        return [ ...scale ]
      } else if (Array.isArray(scale)) {
        return [ ...scale ]
      } else if (null != scale) {
        try { return [ ...scale ] }
        catch(e) { return [ scale, scale, scale ] }
      }
    }

    /**
     * Object3D position vector that translates the
     * local matrix.
     *
     * @public
     * @type {Array<Number>}
     */

    this.position = ({}, args = {}) => {
      args = args || {}
      const position = coalesce(args.position, initialPosition)
      if (position instanceof Vector) {
        return [ ...position ]
      } else if (Array.isArray(position)) {
        return [ ...position ]
      } else if (null != position) {
        try { return [ ...position ] }
        catch(e) { return [ position, position, position ] }
      }
    }

    /**
     * Object3D rotation quaternion.
     *
     * @public
     * @type {Array<Number>}
     */

    this.rotation = ({}, args = {}) => {
      args = args || {}
      const rotation = coalesce(args.rotation, initialRotation)
      if (rotation instanceof Vector) {
        return [ ...rotation ]
      } else if (Array.isArray(rotation)) {
        return [ ...rotation ]
      } else {
        return [0, 0, 0, 1] // identity
      }
    }

    /**
     * Object3D tranform matrix that is computed from positional
     * context data such as position, rotation, and scale. If a
     * transform is given as an argument to the command then it is
     * applied to the computed transform last.
     *
     * @public
     * @type {Array<Number>}
     */

    this.transform = (...args) => {
      return this.computeTransformMatrix(...args)
    }

    /**
     * Object3D local matrix that is computed from positional
     * context data such as position, rotation, and scale. If a
     * transform is given as an argument to the command then it is
     * applied to the computed transform last.
     *
     * @public
     * @type {Array<Number>}
     */

    this.matrix = (...args) => {
      return this.computeLocalMatrix(...args)
    }
  }

  /**
   * Computes the transform matrix for the injected Object3D
   * context derived from rotation, position, and scale data.
   *
   * @protected
   * @method
   * @param {{transform: Array}} ctx
   * @param {{transform: Array}} opts
   * @return {Array}
   */

  computeTransformMatrix({
    transform: parentTransformMatrix
  } = {}, {
    transform: externalTransformMatrix
  } = {}) {
    // reset transform matrix and recompute local matrix
    // before computing transform matrix
    this.computeLocalMatrix(...arguments)
    if (false === this.shouldComputeTransformMatrix) {
      return this.transformMatrix
    }

    if (parentTransformMatrix) {
      // M' = Mp * M
      mat4.multiply(
        this.transformMatrix,
        parentTransformMatrix,
        this.localMatrix)
    }

    // apply external transform from arguments to computed transform
    if (externalTransformMatrix) {
      mat4.multiply(
        this.transformMatrix,
        externalTransformMatrix,
        this.transformMatrix)
    }
    return this.transformMatrix
  }

  /**
   * Computes the local matrix for the injected Object3D
   * context derived from rotation, position, and scale data.
   *
   * @protected
   * @method
   * @param {{transform: Array}} ctx
   * @param {{transform: Array}} opts
   * @return {Array}
   */

  computeLocalMatrix({}, {
    rotation = this.initialRotation,
    position = this.initialPosition,
    scale = this.initialScale,
  } = {}) {
    if (false === this.shouldComputeLocalMatrix) {
      return this.localMatrix
    }
    if ('number' == typeof scale) {
      scale = [scale, scale, scale]
    }
    // M = T * R * S
    mat4.fromRotationTranslation(this.localMatrix, rotation, position)
    mat4.scale(this.localMatrix, this.localMatrix, scale)
    return this.localMatrix
  }
}
