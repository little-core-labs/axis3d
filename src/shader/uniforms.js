import { WebGLShaderUniforms } from '../core'

/**
 * ShaderUniforms(ctx, initialState, props, ...children) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @param {?Object} props
 * @return {Function}
 */
export function ShaderUniforms(ctx, initialState, props, ...children) {
  if ('function' == typeof props) { children.unshift(props) }
  if ('function' == typeof initialState) { children.unshift(initialState) }
  if ('object' != typeof initialState) { initialState = {} }
  if ('object' != typeof props) { props = initialState }
  return ctx.regl({
    uniforms: new WebGLShaderUniforms(ctx, initialState, props)
  })
}
