import {
  WebGLShaderInstancedAttributes,
  WebGLShaderAttributes,
  Component,
} from '../core'

export class ShaderAttributes extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const attributes = ctx.regl({
      attributes: new WebGLShaderAttributes(ctx, initialState, props)
    })
    super(ctx, {}, attributes, ...children)
  }
}

export class ShaderInstancedAttributes extends Component {
  constructor(ctx, initialState, props, ...children) {
    if ('function' == typeof props) { children.unshift(props) }
    if ('function' == typeof initialState) { children.unshift(initialState) }
    if ('object' != typeof initialState) { initialState = {} }
    if ('object' != typeof props) { props = initialState }
    const attributes = ctx.regl({
      attributes: new WebGLShaderInstancedAttributes(ctx, initialState, props)
    })
    super(ctx, {}, attributes, ...children)
  }
}
