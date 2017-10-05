/**
 * Viewport(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @return {Function}
 */
export function Viewport(ctx, initialState = {}) {
  return ctx.regl({viewport: initialState.viewport})
}
