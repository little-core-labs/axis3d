import { assignDefaults, get } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

export class PerspectiveCameraInfoContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, PerspectiveCameraInfoContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
        direction(ctx, args) { return get('direction', [args, ctx]) },
        near(ctx, args) { return get('near', [args, ctx]) },
        far(ctx, args) { return get('far', [args, ctx]) },
        fov(ctx, args) { return get('fov', [args, ctx]) },
        up(ctx, args) { return get('up', [args, ctx]) },
      })
    )
  }
}
