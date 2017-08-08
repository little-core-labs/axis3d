import { Component, DynamicValue } from './core'

export class Viewport extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const context = ctx.regl({viewport: initialState.viewport})
    super(ctx, context, ...children)
  }
}
