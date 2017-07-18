'use strict'

import { DynamicValueCounter, DynamicValue } from './dynamic'

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

  constructor(ctx) {
    super()
    shaderUniformsCounter.addValueForContext(ctx, this)
  }
}
