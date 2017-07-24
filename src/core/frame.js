'use strict'

import { ShaderUniforms, DynamicValue } from './gl'
import { assignTypeName } from './types'
import { Entity } from './entity'
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

export class Frame extends Entity {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState, update)
    assignTypeName(this, 'frame')
    const state = new FrameState(ctx, initialState.state || {})
    const context = new FrameContext(ctx, initialState.context || {})
    const uniforms = new FrameUniforms(ctx, initialState.uniforms || {})
    const injectContext = ctx.regl({ ...state, uniforms, context })
    function update(state, refresh) {
      context.init(injectContext).enqueue(refresh)
      return () => context.cancelFrame()
    }
  }
}

export class FrameContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    const clearState = { ...kDefaultFrameClearState, ...initialState.clear }
    const lights = []
    const queue = []
    super(ctx, {
      get lights() { return lights },
      get fog() { return null },
      get gl() { return ctx ? ctx.gl : null },

      // functions
      cancel: () => (...args) => this.cancelFrame(...args),
      clear: () => (...args) => this.clearBuffers(...args),
      regl: () => ctx ? ctx.regl : null,
    })

    // protected properties
    Object.defineProperties(this, {
      reglContext: { enumerable: false, writable: true, value: null, },
      isCancelled: { enumerable: false, writable: true, value: false, },
      clearState: { get: () => clearState, enumerable: false, },
      queue: { get: () => queue, enumerable: false, },
      loop: { value: null, enumerable: false, writable: true, },
    })
  }

  enqueue(refresh) {
    this.queue.push(refresh)
    return this
  }

  dequeue(...args) {
    for (const refresh of this.queue) {
      if ('function' == typeof refresh) {
        refresh(this.reglContext, ...args)
      }
    }
    return this
  }

  init(inject) {
    if (this.isCancelled || null == this.loop) {
      this.isCancelled = false
      this.loop = this.ctx.regl.frame(() => {
        inject((...args) => {
          try { this.onrefresh(...args) }
          catch (err) {
            this.cancelFrame()
            this.ctx.emit('error', err)
          }
        })
      })
    }
    return this
  }

  cancelFrame() {
    if (this.loop) {
      this.queue.splice(0, -1)
      this.loop.cancel()
      this.ctx._reglContext =
      this.reglContext =
      this.loop = null
    }
  }

  clearBuffers(state) {
    this.ctx.regl.clear({ ...this.clearState, ...state})
  }

  onrefresh(reglContext, ...args) {
    this.reglContext = reglContext
    this.ctx._reglContext = reglContext
    this.clearBuffers()
    reglContext.lights.splice(0, reglContext.lights.length)
    delete reglContext.fog
    this.dequeue(...args)
  }
}

export class FrameUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.set({
      ...initialState,
      time: ({time}) => time,
      tick: ({tick}) => tick,
    })
  }
}

export class FrameState extends DynamicValue {
  constructor(ctx, initialState = {}) {
    super(ctx, {
      ...initialState,
      depth: { ...kDefaultFrameDepthState, ...initialState.depth },
      blend: {
        ...kDefaultFrameBlendingState,
        ...coalesce(initialState.blend, initialState.blending)
      },
      cull: {
        ...kDefaultFrameCullingState,
        ...coalesce(initialState.cull, initialState.culling)
      },
    })

    // remove alias properties this object
    delete this.blending
    delete this.culling
  }
}
