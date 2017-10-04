import { assignDefaults } from './utils'
import { DynamicValue } from './core'

/**
 * UpdateContext(ctx, props}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} props
 * @return {Function}
 */
export function UpdateContext(ctx, initialState, props) {
  if (initialState && !props) {
    props = initialState
    initialState = {}
  }
  const {update} = props
  if ('function' == typeof update) {
    const hash = Math.random().toString('16').slice(2)
    const key = `__${hash}_update`
    return ctx.regl({
      context: new DynamicValue(ctx, initialState, {[key]: (ctx, args) => {
        return update(ctx, assignDefaults(args || {}, initialState))
      }})
    })
  } else {
    // noop
    ctx.regl({})
  }
}
