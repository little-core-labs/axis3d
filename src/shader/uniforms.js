import { WebGLShaderUniforms, Component } from '../core'

export class ShaderUniforms extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const uniforms = ctx.regl({
      uniforms: new WebGLShaderUniforms(ctx, initialState, props)
    })
    super(ctx, uniforms, ...children)
  }
}
