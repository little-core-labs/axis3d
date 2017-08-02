import { DynamicValueCounter, DynamicValue } from './dynamic'
import { defaults } from '../../utils'

const shaderUniformsCounter = DynamicValue.createCounter()

export class ShaderUniforms extends DynamicValue {
  static counter() { return shaderUniformsCounter }
  static getTotalUniformCount() {
    const counter = ShaderUniforms.counter()
    const list = counter.list()
    const sum = list
      .map((ctx) => ShaderUniforms.getContextUniformCount(ctx))
      .reduce((a, b) => a + b, 0)
    return sum
  }

  static getContextUniformCount(ctx) {
    const counter = ShaderUniforms.counter()
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
