import { Component, DynamicValue } from './core'

export class Compute extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const getContext = ctx.regl({})
    super(ctx, (state, block) => {
      getContext(initialState.compute)
      getContext(block)
    }, ...children)
  }
}
