import {
  WebGLShaderInstancedAttributes,
  WebGLShaderAttributes,
} from '../core'

/**
 * ShaderAttributes(ctx, initialState, props) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @param {?Object} props
 * @return {Function}
 */
export function ShaderAttributes(ctx, initialState, props) {
  if ('object' != typeof initialState) { initialState = {} }
  if ('object' != typeof props) { props = initialState }
  const attributes = new WebGLShaderAttributes(ctx, initialState, props)
  return ctx.regl({attributes, context: { attributes: () => attributes }})
}

/**
 * ShaderInstancedAttributes(ctx, initialState, props) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @param {?Object} props
 * @return {Function}
 */
export function ShaderInstancedAttributes(ctx, initialState, props) {
  if ('object' != typeof initialState) { initialState = {} }
  if ('object' != typeof props) { props = initialState }
  const attributes = new WebGLShaderInstancedAttributes(ctx, initialState, props)
  return ctx.regl({attributes, context: { attributes: () => attributes }})
}
