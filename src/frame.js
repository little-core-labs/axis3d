'use strict'

/**
 * Module dependencies.
 */

import { $reglContext } from './symbols'
import { Command } from './command'
import { define } from './utils'

/**
 * FrameCommand constructor.
 * @see FrameCommand
 */

module.exports = exports = (...args) => new FrameCommand(...args)

/**
 * FrameCommand class.
 *
 * @public
 * @class FrameCommand
 * @extends Command
 */

export class FrameCommand extends Command {

  /**
   * FrameCommand class constructor.
   *
   * @param {Context} ctx
   */

  constructor(ctx, opts = {}) {
    const queue = []
    const regl = ctx.regl
    const fbo = regl.framebuffer({depth: true})

    let reglContext = null
    let isRunning = false
    let tick = null

    const injectContext = regl({
      context: {
        resolution: ({viewportWidth: w,
                      viewportHeight: h}) => ([ w, h ])
      }
    })

    super((_, refresh) => {
      queue.push(refresh)
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
        ctx[$reglContext] =
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
          try {
            injectContext((_) => {
              reglContext = _
              ctx[$reglContext] = reglContext
              const {
                viewportWidth: width,
                viewportHeight: height,
              } = reglContext
              fbo.resize(width, height)
              ctx.reset()
              ctx.clear()
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
