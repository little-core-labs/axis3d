'use strict'

/**
 * Module dependencies.
 */

import {
  Quaternion,
  Vector
} from './math'

import {
  incrementStat
} from './stats'

import {
  Command
} from './command'

import {
  define
} from './utils'

import mat4 from 'gl-mat4'
import vec4 from 'gl-vec4'
import vec3 from 'gl-vec3'
import vec2 from 'gl-vec2'
import quat from 'gl-quat'

let OBJECT_COMMAND_COUNTER = 0

module.exports = exports = (...args) => new Object3DCommand(...args)
export class Object3DCommand extends Command {
  //
  // Returns the next object ID
  //
  static id() {
    return OBJECT_COMMAND_COUNTER ++
  }

  constructor(ctx, initialState = {}) {
    incrementStat('Object3D')

    const {
      transform: wantsTransform = true,
      update = function () {},
      type = 'object',
      id = Object3DCommand.id(),

      rotation: initialRotation = [0, 0, 0, 1],
      position: initialPosition = [0, 0, 0],
      scale: initialScale = [1, 1, 1],
    } = initialState

    let didJustComputeTransfromFromInitialState = false
    const transform = mat4.identity([])
    const local = mat4.identity([])

    // regl context
    const injectContext = ctx.regl({
      context: {
        id: () => id,
        scale: ({}, {scale = initialScale} = {}) => scale,
        position: ({}, {position = initialPosition} = {}) => position,
        rotation: ({}, {rotation = initialRotation} = {}) => rotation,
        transform: ({transform: parentTransform}, args = {}, batchId) => {
          if (false === wantsTransform) {
            return undefined
          }

          const {
            scale = initialScale,
            position = initialPosition,
            rotation = initialRotation,
          } = args

          // create copy in case for nested cycles
          if (parentTransform) {
            parentTransform = [ ...parentTransform ]
          } else {
            parentTransform = mat4.identity([])
          }

          if (scale == initialScale &&
              position == initialPosition &&
              rotation == initialRotation &&
              didJustComputeTransfromFromInitialState) {
            return mat4.multiply(transform, parentTransform, local)
          }

          mat4.identity(local)
          mat4.identity(transform)

          // M = T * R * S
          mat4.translate(local, local, position)
          mat4.multiply(local, local, mat4.fromQuat([], rotation))
          mat4.scale(local, local, scale)

          if (scale == initialScale &&
              position == initialPosition &&
              rotation == initialRotation) {
            didJustComputeTransfromFromInitialState = true
          } else {
            didJustComputeTransfromFromInitialState = false
          }

          // M' = Mp * M
          mat4.multiply(transform, parentTransform, local)

          return transform
        },
      }
    })

    // calls current target render function
    super((state = {}, block = () => void 0) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      // inject context suitable for
      // all Object3DCommand instances
      injectContext(state, ({}, args = {}) => {
        update(args, block)
      })
    })

    //
    // Public read only properties
    //
    define(this, 'id', { get() { return id } })
  }
}
