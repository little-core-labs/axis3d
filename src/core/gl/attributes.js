import { DynamicValue } from './dynamic'
import { assign } from '../../utils'

const shaderAttributesCounter = DynamicValue.createCounter()

export class ShaderAttributes extends DynamicValue {
  static counter() { return shaderAttributesCounter }
  static getTotalUniformCount() {
    const counter = ShaderAttributes.counter()
    const list = counter.list()
    const sum = list
      .map((ctx) => ShaderAttributes.getContextUniformCount(ctx))
      .reduce((a, b) => a + b, 0)
    return sum
  }

  static getContextUniformCount(ctx) {
    const counter = ShaderAttributes.counter()
    const list = counter.listSetForContext(ctx)
    const attributes = list.reduce((a, b) => assign(a, b), {})
    const sum = Object.keys(attributes).length
    return sum
  }

  constructor(ctx, initialState, props) {
    super(ctx, initialState, props)
    shaderAttributesCounter.addValueForContext(ctx, this)
  }
}
