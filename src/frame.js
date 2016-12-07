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
    const cancel = () => {
      if (tick) {
        queue.splice(0, -1)
        tick.cancel()
        ctx[$reglContext] =
        reglContext =
        tick = null
      }
    }

    super((_, refresh) => {
      queue.push(refresh)
      if (false == isRunning) {
        tick = regl.frame((_, ...args) => {
          try {
            isRunning = true
            scope((_) => {
              reglContext = _
              ctx[$reglContext] = reglContext
              fbo.resize(reglContext.viewportWidth,
                         reglContext.viewportHeight)
                         ctx.clear()
                         for (let refresh of queue) {
                           if ('function' == typeof refresh) {
                             refresh(reglContext, ...args)
                           }
                         }
            })
          } catch (e) {
            console.error(e.stack || e)
            cancel()
          }
        })
      }

      return cancel
    })

    const scope = regl({
      context: {
        resolution: ({viewportWidth, viewportHeight}) => ([
          viewportWidth, viewportHeight
        ])
      },

      uniforms: {
        time: regl.context('time'),
        resolution: ({viewportWidth, viewportHeight}) => ([
          viewportWidth, viewportHeight
        ]),
      }
    })
  }
}
