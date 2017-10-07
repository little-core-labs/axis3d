import { assignDefaults, pick } from '../utils'
import { ScopedContext } from '../scope'
import * as defaults from './defaults'

export function FrameContext(ctx, initialState) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    // props
    regl() { return ctx ? ctx.regl : null },
    gl() { return ctx ? ctx.gl : null },

    // functions
    clear(ctx, args) {
      return (clear) => {
        return ctx.regl.clear({
          ...(clear || pick('clear', [args, initialState]))
        })
      }
    }
  })
}
