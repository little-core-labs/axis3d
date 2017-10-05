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
  if ('update' in initialState) {
    delete initialState.update
  }
  if ('function' == typeof props.update) {
    return ctx.regl({
      context: new DynamicValue(
        ctx,
        initialState,
        createUniqueUpdateFunction(initialState, update))
    })
  } else {
    // noop
    return ctx.regl({})
  }
}

function createUniqueUpdateFunction(initialState, update) {
  const hash = Math.random().toString('16').slice(2)
  const key = `__${hash}_update`
  return {[key]: (ctx, args) => update(ctx, assignDefaults(args || {}, initialState))}
}
