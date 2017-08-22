import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { Component } from '../core'

import { FrameContext } from './context'
import { FrameState } from './state'
import * as defaults from './defaults'

export class Frame extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Frame.defaults())
    const {frames = []} = initialState

    const context = new FrameContext(ctx, initialState)
    const state = new FrameState(ctx, initialState)

    const getContext = ctx.regl({})
    const clear = () => getContext(({clear}) => clear())
    const autoClear = Component.compose(context, clear)
    const pipe = Component.compose(state, context)

    let loop = null // for all frames
    super(ctx, initialState, (state, refresh) => {
      if (null == loop) { createFrameLoop() }
      const inject = new ScopedContext(ctx, {frame: () => frame, frames, loop})
      const update = Component.compose(inject, pipe)
      const frame = createFrameRefresh(refresh, update)
      frames.push(frame)
    })

    function createFrameRefresh(refresh, components) {
      let cancelled = null
      let frame = null
      return frame = {
        cancel() { cancelled = true },
        onframe() {
          if (cancelled) {
            frames.splice(frames.indexOf(frame, 1))
          } else try {
            components(() => getContext(refresh))
          } catch (err) {
            ctx.emit('error', err)
            destroyFrameLoop()
          }
        }
      }
    }

    function createFrameLoop() {
      for (const f of frames) { f.onframe() }
      loop = ctx.regl.frame(() => {
        try {
          if (true === initialState.autoClear) { autoClear() }
          for (const f of frames) { f.onframe() }
        } catch (err) {
          try { for (const f of frames) { f.cancel() } }
          catch (err) { ctx.emit('error', err); }
          destroyFrameLoop()
        }
      })
    }

    function destroyFrameLoop() {
      try { for (const f of frames) { f.cancel() } }
      catch (err) { ctx.emit('error', err); }
      frames.splice(0, frames.length)
    }
  }
}
