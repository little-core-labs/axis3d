import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { Component } from '../core'

import { FrameShaderUniforms } from './uniforms'
import { FrameContext } from './context'
import { FrameState } from './state'
import * as defaults from './defaults'

export class Frame extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Frame.defaults())
    const getContext = ctx.regl({})

    const uniforms = new FrameShaderUniforms(ctx, initialState)
    const context = new FrameContext(ctx, initialState)
    const state = new FrameState(ctx, initialState)

    const clear = () => getContext(({clear}) => clear())
    const autoClear = Component.compose(context, clear)
    const frames = []
    const pipe = Component.compose(state, context, uniforms)

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
        onframe(...args) {
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
      loop = ctx.regl.frame((...args) => {
        try {
          if (true === initialState.autoClear) { autoClear() }
          for (const f of frames) { f.onframe(...args) }
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
