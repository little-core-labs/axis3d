import { assignDefaults, pick} from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'

export function PerspectiveCameraInfoContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, {
    direction(ctx, args) { return pick('direction', [args, initialState, ctx]) },
    near(ctx, args) { return pick('near', [args, initialState, ctx]) },
    far(ctx, args) { return pick('far', [args, initialState, ctx]) },
    fov(ctx, args) { return pick('fov', [args, initialState, ctx]) },
    up(ctx, args) { return pick('up', [args, initialState, ctx]) },
  })
}
