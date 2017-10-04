/**
 * Scissor(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @return {Function}
 */
export function Scissor(ctx, initialState = {}) {
  return ctx.regl({
    scissor: { enable: true, box: initialState.scissor }
  })
}
