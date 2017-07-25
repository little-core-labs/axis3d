'use strict'

import { DynamicValue } from './gl'
import { Command } from './command'
import { Entity } from './entity'
import coalesce from 'defined'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

export class Object3D extends Entity {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState, update)

    const {context = new Object3DContext(ctx, initialState)} = initialState
    const {update: updateObject = null} = initialState

    // ensure context is a descendant of Object3DContext
    if (false == context instanceof Object3DContext) {
      throw new TypeError("Expecting instance of Object3DContext given.")
    }

    if (null != updateObject && 'function' != typeof updateObject) {
      throw new TypeError(
      `Expecting update function to be a function. Got ${typeof updateObject}.`)
    }


    const injectContext = ctx.regl({context})

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

export class Object3DContext extends DynamicValue {

  constructor(ctx, initialState = {}) {
    super(ctx)
    const {
      computeTransformMatrix = true,
      computeLocalMatrix = true,
      rotation: initialRotation = [0, 0, 0, 1],
      position: initialPosition = [0, 0, 0],
      scale: initialScale = [1, 1, 1],
      id = Object3D.id(),
    } = initialState

    const transformMatrix = mat4.identity([])
    const localMatrix = mat4.identity([])

    // protected properties
    Object.defineProperties(this, {
      shouldComputeTransformMatrix: {
        enumerable: false,
        value: computeTransformMatrix,
      },
      shouldComputeLocalMatrix: { enumerable: false,
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

    this.set({
      transform: (...args) => this.computeTransformMatrix(...args),
      matrix: (...args) => this.computeLocalMatrix(...args),
      id: this.argument('id', null, id),

      scale({}, args = {}) {
        args = args || {}
        let scale = coalesce(args.scale, initialScale)
        if ('number' == typeof scale) {
          return [scale, scale, scale]
        } else if (null != scale) {
          try { return [ ...scale ] }
          catch(e) { }
        }
        return [1, 1, 1]
      },

      position({}, args = {}) {
        args = args || {}
        const position = coalesce(args.position, initialPosition)
        if (null != position) {
          try { return [ ...position ] }
          catch(e) { }
        }
        return [0, 0, 0]
      },

      rotation({}, args = {}) {
        args = args || {}
        const rotation = coalesce(args.rotation, initialRotation)
        if (null != rotation)  {
          try { return [ ...rotation ] }
          catch(e) {}
        }
        return [0, 0, 0, 1] // identity
      },
    })
  }

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
