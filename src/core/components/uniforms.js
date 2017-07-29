import { ShaderUniforms } from '../gl'
import { Component } from '../component'

export class UniformsComponent extends Component {
  constructor(ctx, props = {}, ...children) {
    const uniforms = ctx.regl({uniforms: new ShaderUniforms(ctx, {}, props)})
    super(ctx, {}, uniforms, ...children)
  }
}
