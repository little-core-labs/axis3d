import { ContextComponent, UniformsComponent } from './components'
import { assign, get } from '../utils'
import { Component } from './component'

export class Frame extends Component {
  static defaults() {
    return {
      autoClear: true,
      blending: { equation: 'add', enable: false, color: [0, 0, 0, 1],
                  func: { src: 'src alpha', dst: 'one minus src alpha' } },
      culling: { enable: true, face: 'back' },
      depth: { enable: true, range: [0, 1], func: 'less', mask: true },
      clear: { color: [17/255, 17/255, 17/255, 1], depth: 1 },
    }
  }

  constructor(ctx, initialState = {}) {
    assign(initialState, Frame.defaults(), initialState)
    const getContext = ctx.regl({})
    const uniforms = new FrameUniforms(ctx, initialState)
    const context = new FrameContext(ctx, initialState)
    const state = new FrameState(ctx, initialState)
    const clear = () => getContext(({clear}) => clear())
    const autoClear = Component.compose(context, clear)
    const frames = []

    let loop = null // for all frames
    super(ctx, initialState, (state, refresh) => {
      if (null == loop) { createFrameLoop() }
      const inject = new ContextComponent(ctx, {
        frame: () => frame, frames, loop
      })
      const frame = createFrameRefresh(refresh, Component.compose(
        inject,
        state,
        context,
        uniforms,
      ))
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

export class FrameContext extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, Frame.defaults(), initialState)
    super(ctx, initialState,
      new ContextComponent(ctx, {
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

export class FrameUniforms extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, Frame.defaults(), initialState)
    super(ctx, initialState,
      new UniformsComponent(ctx, {
        time: ({time}) => time,
        tick: ({tick}) => tick,
      })
    )
  }
}

export class FrameState extends Component {
  constructor(ctx, initialState = {}) {
    assign(initialState, Frame.defaults(), initialState)
    super(ctx,
      ctx.regl({
        depth: { ...initialState.depth },
        blend: { ...initialState.blending },
        cull: { ...initialState.culling },
      })
    )
  }
}
