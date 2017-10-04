import { assignDefaults } from '../utils'
import * as defaults from './defaults'

export function FrameState(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ctx.regl({
    depth: { ...initialState.depth },
    blend: { ...initialState.blending },
    cull: { ...initialState.culling },
  })
}
