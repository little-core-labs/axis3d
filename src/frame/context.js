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
    cancel({frame, frames}) {
      return () => {
        if (frame) {
          frame.cancel()
          frames.splice(frames.indexOf(frame), 1)
        }
      }
    },

    clear(ctx, args) {
      return (clear) => {
        return ctx.regl.clear({
          ...(clear || pick('clear', [args, initialState]))
        })
      }
    },

    cancelAll({frames, frame, loop}) {
      return () => {
        if (frames) {
          for (const f of frames) { f.cancel() }
          frames.splice(0, frames.length)
        }
        if (loop) {
          loop.cancel()
          loop = null
        }
      }
    }
  })
}

