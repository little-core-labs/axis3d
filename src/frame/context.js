import { assignDefaults, get } from '../utils'
import { ScopedContext } from '../scope'
import { Component } from '../core'
import * as defaults from './defaults'

export class FrameContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, FrameContext.defaults())
    super(ctx, initialState,
      new ScopedContext(ctx, {
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
            ctx.regl.clear({
              ...(clear || get('clear', [args, initialState]))
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
    )
  }
}

