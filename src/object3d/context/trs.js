import { assertComponentArguments, normalizeScaleVector, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import { alloc } from '../../core/buffer'
import * as defaults from '../defaults'

/**
 * The Object3DTRSContext component maps input position, rotation, and scale
 * arguments into context variables. Default values are used if not provided
 * as input arguments to this component function.
 *
 * Object3DTRSContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DTRSContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DTRSContext', ctx, initialState)
  const position = alloc(ctx, 3)
  const rotation = alloc(ctx, 4)
  const scale = alloc(ctx, 3)
  return ScopedContext(ctx, initialState, {
    scale({}, args) {
      scale.set(normalizeScaleVector(pick('scale', [
        args, initialState, defaults
      ])))
      return scale
    },

    position({}, args) {
      position.set(pick('position', [args, initialState, defaults]))
      return position
    },

    rotation({}, args) {
      rotation.set(pick('rotation', [args, initialState, defaults]))
      return rotation
    },
  })
}
