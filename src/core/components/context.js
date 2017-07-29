import { DynamicValue } from '../gl'
import { Component } from '../component'

export class ContextComponent extends Component {
  constructor(ctx, props = {}, ...children) {
    const context = ctx.regl({context: new DynamicValue(ctx, {}, props)})
    super(ctx, {}, context, ...children)
  }
}
