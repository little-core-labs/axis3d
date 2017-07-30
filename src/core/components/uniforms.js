import { ShaderUniforms } from '../gl'
import { Component } from '../component'

export class UniformsComponent extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const uniforms = ctx.regl({
      uniforms: new ShaderUniforms(ctx, initialState, props)
    })
    super(ctx, uniforms, ...children)
  }
}
