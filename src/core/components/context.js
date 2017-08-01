import { DynamicValue } from '../gl'
import { Component } from '../component'

export class ContextComponent extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const context = ctx.regl({context: new DynamicValue(ctx, {}, props)})
    super(ctx, context, ...children)
  }
}
