import { PerspectiveCameraInfoContext } from '../../perspective'
import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import { Entity } from '../../../core'

export function OrthographicCameraInfoContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    PerspectiveCameraInfoContext(ctx, initialState),
    ScopedContext(ctx, {
      viewport(ctx, args) {
        const viewport = pick('viewport', [args, initialState])
        const height = pick('viewportHeight', [args, ctx, initialState])
        const width = pick('viewportWidth', [args, ctx, initialState])
        const near = pick('near', [args, ctx, initialState])
        const far = pick('far', [args, ctx, initialState])
        return viewport || [-far, -far, far, far]
      }
    })
  )
}
