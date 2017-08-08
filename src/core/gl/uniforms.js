import { DynamicValue } from '../dynamic'

const shaderUniformsCounter = DynamicValue.createCounter()

export class WebGLShaderUniforms extends DynamicValue {
  static counter() { return shaderUniformsCounter }
  static getTotalUniformCount() {
    const counter = WebGLShaderUniforms.counter()
    const list = counter.list()
    const sum = list
      .map((ctx) => WebGLShaderUniforms.getContextUniformCount(ctx))
      .reduce((a, b) => a + b, 0)
    return sum
  }

  static getContextUniformCount(ctx) {
    const counter = WebGLShaderUniforms.counter()
    const list = counter.listSetForContext(ctx)
    const uniforms = list.reduce((a, b) => Object.assign(a, b), {})
    const sum = Object.keys(uniforms).length
    return sum
  }

  constructor(ctx, initialState, props) {
    super(ctx, { ...initialState}, { ...props })
    shaderUniformsCounter.addValueForContext(ctx, this)
  }
}
