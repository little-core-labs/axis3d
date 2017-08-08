import { assignDefaults } from '../utils'
import { MaterialState } from '../material'
import { Component } from '../core'
import * as defaults from './defaults'

export class FrameState extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, FrameState.defaults())
    super(ctx,
      ctx.regl({
        depth: { ...initialState.depth },
        blend: { ...initialState.blending },
        cull: { ...initialState.culling },
      })
    )
  }
}
