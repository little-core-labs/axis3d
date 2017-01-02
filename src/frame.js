'use strict'

/**
 * Module dependencies.
 */

import { Command } from './command'
import { define } from './utils'

import {
  incrementStat,
  registerStat,
  resetStat
} from './stats'

module.exports = exports = (...args) => new FrameCommand(...args)
export class FrameCommand extends Command {
  constructor(ctx, opts = {}) {
    incrementStat('Frame')
    const {regl} = ctx
    const queue = []

    const texture = regl.texture()
    let reglContext = null
    let isRunning = false
    let tick = null

    const injectContext = regl({
      context: {
        resolution: ({viewportWidth: w, viewportHeight: h}) => ([w, h]),
      }
    })

    super((refresh) => {
      queue.push(refresh)
      registerStat('Frame refresh')
      frame()
      return cancel
    })

    //
    // cancels regl animation frame loop,
    // resets state, and removes the caputured
    // regl context from the axis context
    //
    function cancel() {
      if (tick) {
        queue.splice(0, -1)
        tick.cancel()
        ctx._reglContext =
        reglContext =
        tick = null
      }
    }

    //
    // Function to handle regl animation
    // frame loop logic that captures the regl context
    // and stores it on the axis context. It also
    // clears the drawing canvas, resets the axis context,
    // and calls all queued frame refresh functions
    //
    function frame() {
      if (false == isRunning) {
        isRunning = true
        tick = regl.frame((_, ...args) => {
          reglContext = _
          ctx._reglContext = reglContext
          const {
            viewportWidth: width,
            viewportHeight: height,
          } = reglContext

          try {
            injectContext((_) => {
              // clear
              ctx.reset()
              ctx.clear()

              // draw
              for (let refresh of queue) {
                if ('function' == typeof refresh) {
                  refresh(reglContext, ...args)
                }
              }

            })

          } catch (e) {
            ctx.emit('error', e)
            cancel()
          }
        })
      }
    }
  }
}
