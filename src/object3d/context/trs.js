import { assignDefaults } from '../../utils'
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
      const scale = pick('scale', [args, defaults, ctx])
      if ('number' == typeof scale) { return [scale, scale, scale] }
      return scale
    },

    position(ctx, args) {
      return pick('position', [args, defaults, ctx])
    },

    rotation(ctx, args) {
      return pick('rotation', [args, defaults, ctx])
    },
  })
}
