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
export function ShaderUniforms(ctx, initialState, props) {
  if ('object' != typeof initialState) { initialState = {} }
  if ('object' != typeof props) { props = initialState }
  const uniforms = new WebGLShaderUniforms(ctx, initialState, props)
  return ctx.regl({ uniforms, context: { uniforms } })
}
