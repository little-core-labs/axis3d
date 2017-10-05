import { ScopedContext } from '../scope'

/**
 * ShaderDefines(ctx, initialState, props) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @param {?Object} props
 * @return {Function}
 */
export function ShaderDefines(ctx, initialState, props) {
  if ('object' != typeof initialState) { initialState = {} }
  if ('object' != typeof props) {
    props = initialState
    initialState = {}
  }
  props = { ...props }
  return ScopedContext(ctx, {
    ...initialState,
    defines(...args) {
      const {defines = {}} = args[0] // from regl context
      for (const prop in props) {
        const value = props[prop]
        if ('function' == typeof value) {
          defines[prop] = value(...args)
        } else {
          defines[prop] = value
        }

        if (null == defines[prop]) { delete defines[prop] }
      }

      return defines
    }
  })
}
