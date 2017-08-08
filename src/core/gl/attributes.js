import { DynamicValue } from '../dynamic'

const shaderAttributesCounter = DynamicValue.createCounter()

export class WebGLShaderAttributes extends DynamicValue {
  static counter() { return shaderAttributesCounter }
  static getTotalUniformCount() {
    const counter = WebGLShaderAttributes.counter()
    const list = counter.list()
    const sum = list
      .map((ctx) => WebGLShaderAttributes.getContextUniformCount(ctx))
      .reduce((a, b) => a + b, 0)
    return sum
  }

  static getContextUniformCount(ctx) {
    const counter = WebGLShaderAttributes.counter()
    const list = counter.listSetForContext(ctx)
    const attributes = list.reduce((a, b) => Object.assign(a, b), {})
    const sum = Object.keys(attributes).length
    return sum
  }

  constructor(ctx, initialState = {}, props) {
    if (null == props) {
      props = initialState
      initialState = {}
    } else if (null == initialState && null == props) {
      initialState = {}
      props = {}
    }
    super(ctx, initialState, props)
    shaderAttributesCounter.addValueForContext(ctx, this)
  }
}

export class WebGLShaderInstancedAttributes extends WebGLShaderAttributes {
  constructor(ctx, initialState = {}, props) {
    if (null == props && 'object' == typeof initialState) {
      props = initialState
      initialState = {}
    } else if (null == initialState && null == props) {
      initialState = {}
      props = {}
    }
    for (const prop in props) {
      if (props[prop] && 'object' == typeof props[prop]) {
        if ('object' == typeof props[prop].buffer) {
          if ('number' != typeof props[prop].divisor) {
            props[prop].divisor = 1
          }
        } else {
          props[prop] = {
            buffer: props[prop],
            divisor: 1
          }
        }
      }
    }
    super(ctx, initialState, props)
  }
}
