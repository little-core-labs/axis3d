'use strict'
export { ShaderAttributes } from './attributes'
export { ShaderUniforms } from './uniforms'
export { DynamicValue } from './dynamic'

Object.assign(window, {ShaderUniforms: exports.ShaderUniforms})
