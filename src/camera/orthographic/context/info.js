import { PerspectiveCameraInfoContext } from '../../perspective'
import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class OrthographicCameraInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, OrthographicCameraInfoContext.defaults())
    super(ctx, initialState,
      new PerspectiveCameraInfoContext(ctx, initialState),
      new ScopedContext(ctx, {
        viewport(ctx, args) {
          const viewport = get('viewport', [args, initialState])
          const height = get('viewportHeight', [args, ctx, initialState])
          const width = get('viewportWidth', [args, ctx, initialState])
          const near = get('near', [args, ctx, initialState])
          const far = get('far', [args, ctx, initialState])
          return viewport || [-far, -far, far, far]
        }
      })
    )
  }
}
