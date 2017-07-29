import { ContextComponent, UniformsComponent } from './components'
import { Component } from './component'
import { get } from '../utils'

export class Frame extends Component {
  static defaults() {
    return {
      blending: { equation: 'add', enable: false, color: [0, 0, 0, 1],
                  func: { src: 'src alpha', dst: 'one minus src alpha' } },
      culling: { enable: true, face: 'back' },
      depth: { enable: true, range: [0, 1], func: 'less', mask: true, },
      clear: { color: [17/255, 17/255, 17/255, 1], depth: 1, },
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
    const uniforms = new FrameUniforms(ctx, initialState)
    const context = new FrameContext(ctx, initialState)
    const state = new FrameState(ctx, initialState)
    const frames = []
    super(ctx, initialState, (state, refresh) => {
      const inject = new ContextComponent(ctx, {frame: () => frame})
      const frame = ctx.regl.frame(onframe)
      const clear = ({clear}, block) => {
        clear();
        block();
      }
      const component = Component.compose([
        state,
        frame,
        context,
        uniforms,
        inject,
        refresh
      ])
      frames.push(frame)
      function onframe(...args) {
        try { component(...args) }
        catch (err) {
          for (const f of frames) { f.cancel() }
          frames.splice(0, frames.length)
          ctx.emit('error', err)
        }
      }
    })
  }
}

export class FrameContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      // functions
      cancel: ({frame}) => () => frame ? frame.cancel() : null,
      clear: (ctx, args) => (clear) => {
        ctx.regl.clear({ ...(clear || get('clear', [args, initialState])) })
      },
      // props
      regl: () => ctx ? ctx.regl : null,
      gl: () => ctx ? ctx.gl : null,
    }))
  }
}

export class FrameUniforms extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
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
    Object.assign(initialState, Frame.defaults(), initialState)
    super(ctx, {},
      ctx.regl({
        depth: { ...initialState.depth },
        blend: { ...initialState.blending },
        cull: { ...initialState.culling },
      })
    )
  }
}
