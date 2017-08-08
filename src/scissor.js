import { Component, DynamicValue } from './core'

export class Scissor extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const context = ctx.regl({
      scissor: { enable: true, box: initialState.scissor }
    })
    super(ctx, context, ...children)
  }
}
