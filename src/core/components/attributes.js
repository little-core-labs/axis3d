import { InstancedShaderAttributes, ShaderAttributes } from '../gl'
import { Component } from '../component'

export class AttributesComponent extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const attributes = ctx.regl({
      attributes: new ShaderAttributes(ctx, initialState, props)
    })
    super(ctx, {}, attributes, ...children)
  }
}

export class InstancedAttributesComponent extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const attributes = ctx.regl({
      attributes: new InstancedShaderAttributes(ctx, initialState, props)
    })
    super(ctx, {}, attributes, ...children)
  }
}
