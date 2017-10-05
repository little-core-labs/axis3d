import { command as extend } from 'regl-extend'
import { DynamicValue } from './core'

/**
 * ScopedContext(ctx, props = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} props
 * @return {Function}
 */
export function ScopedContext(ctx, initialState, props) {
  if (initialState && !props) {
    props = initialState
    initialState = {}
  }
  return ctx.regl({
    context: new DynamicValue(ctx, initialState, props)
  })
}

/**
 * ScopedState(ctx, props = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} props
 * @return {Function}
 */
export function ScopedState(ctx, initialState, props) {
  if (initialState && !props) {
    props = initialState
    initialState = {}
  }
  return ctx.regl(extend(new DynamicValue(ctx, initialState, props)))
}
