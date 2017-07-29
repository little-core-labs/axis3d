import { ShaderAttributes } from '../gl'
import { Component } from '../component'

export class AttributesComponent extends Component {
  constructor(ctx, props = {}, ...children) {
    const attributes = ctx.regl({
      attributes: new ShaderAttributes(ctx, {}, props)
    })
    super(ctx, {}, attributes, ...children)
  }
}
