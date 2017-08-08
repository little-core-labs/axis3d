import { assignDefaults } from '../utils'
import { ShaderUniforms } from '../shader'
import { Component } from '../core'
import * as defaults from './defaults'

export class FrameShaderUniforms extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, FrameShaderUniforms.defaults())
    super(ctx, initialState,
      new ShaderUniforms(ctx, {
        time: ({time}) => time,
        tick: ({tick}) => tick,
      })
    )
  }
}
