import { assignDefaults } from '../utils'
import { ShaderUniforms } from '../shader'
import * as defaults from './defaults'

export function FrameShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
    resolution: ({drawingBufferWidth: w, drawingBufferHeight: h}) => [w, h],
    time: ({time}) => time,
    tick: ({tick}) => tick,
  })
}
