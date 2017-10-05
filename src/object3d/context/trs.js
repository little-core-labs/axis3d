import { assignDefaults, normalizeScaleVector } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import { pick } from '../../utils'

/**
 * Object3DTRSContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context}
 * @return {Function}
 */
export function Object3DTRSContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    scale(ctx, args) {
      return normalizeScaleVector(pick('scale', [args, defaults, ctx]))
    },

    position(ctx, args) {
      return pick('position', [args, defaults, ctx])
    },

    rotation(ctx, args) {
      return pick('rotation', [args, defaults, ctx])
    },
  })
}
