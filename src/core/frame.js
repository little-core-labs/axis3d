import { UniformsComponent } from './components/uniforms'
import { ContextComponent } from './components/context'
import { Component } from './component'
import coalesce from 'defined'

export const kDefaultFrameBlendingState = Object.seal({
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' },
})

export const kDefaultFrameCullingState = Object.seal({
  enable: true,
  face: 'back',
})

export const kDefaultFrameDepthState = Object.seal({
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true,
})

export const kDefaultFrameClearState = Object.seal({
  color: [17/255, 17/255, 17/255, 1],
  depth: 1,
})

export class Frame extends Component {
  static defaults() {
    return {
      blending: kDefaultFrameBlendingState,
      culling: kDefaultFrameCullingState,
      depth: kDefaultFrameDepthState,
      clear: kDefaultFrameClearState,
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
      const components = [state, frame, context, uniforms, inject, refresh]
      const component = Component.compose(components)
      const frame = ctx.regl.frame(component)
    })
  }
}

export class FrameContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
    const clearState = { ...kDefaultFrameClearState, ...initialState.clear }
    super(ctx, initialState, new ContextComponent(ctx, {
      // functions
      cancel: ({frame}) => () => frame ? frame.cancel() : null,
      clear: () => () => ctx.regl.clear({ ...clearState }),
      // props
      regl: () => ctx ? ctx.regl : null,
      gl: () => ctx ? ctx.gl : null,
    }))
  }
}

export class FrameUniforms extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
    super(ctx, initialState, new UniformsComponent(ctx, {
      time: ({time}) => time,
      tick: ({tick}) => tick,
    }))
  }
}

export class FrameState extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Frame.defaults(), initialState)
    super(ctx, {}, ctx.regl({
      ...initialState.state,
      depth: { ...kDefaultFrameDepthState, ...initialState.depth },
      blend: {
        ...kDefaultFrameBlendingState,
        ...coalesce(initialState.blend, initialState.blending)
      },
      cull: {
        ...kDefaultFrameCullingState,
        ...coalesce(initialState.cull, initialState.culling)
      },
    }))
  }
}
