import { assertComponentArguments, normalizeScaleVector, pick } from '../../utils'
import { ScopedContext } from '../../scope'
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
  return ScopedContext(ctx, initialState, {
    scale({}, args) {
      return normalizeScaleVector(pick('scale', [args, initialState, defaults]))
    },

    position({}, args) {
      return pick('position', [args, initialState, defaults])
    },

    rotation({}, args) {
      return pick('rotation', [args, initialState, defaults])
    },
  })
}
