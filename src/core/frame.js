'use strict'

/**
 * Module dependencies.
 */

import { kDefaultMaterialFragmentShader } from './material'
import { incrementStat, registerStat } from '../stats'
import { assignTypeName } from './types'
import { ShaderUniforms } from './gl'
import { Command } from './command'
import { define } from '../utils'
import { Color } from './color'
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

export class Frame extends Command {
  constructor(ctx, initialState = {}) {
    super(update)
    incrementStat('Frame')
    assignTypeName(this, 'frame')
    const state = new FrameState(ctx, initialState.state || {})
    const context = new FrameContext(ctx, initialState.context || {})
    const uniforms = new FrameUniforms(ctx, initialState.uniforms || {})
    const injectContext = ctx.regl({ uniforms, context, ...state })
    function update(refresh) {
      context.init(injectContext).enqueue(refresh)
      return () => context.cancelFrame()
    }
  }
}

export class FrameContext {
  constructor(ctx, initialState = {}) {
    Object.assign(this, initialState)

    const queue = []
    const lights = []
    const clearState = { ...kDefaultFrameClearState, ...initialState.clear }


    // protected properties
    Object.defineProperties(this, {
      reglContext: { enumerable: false, writable: true, value: null, },
      isCancelled: { enumerable: false, writable: true, value: false, },
      clearState: { get() { return clearState }, enumerable: false, },
      queue: { get() { return queue }, enumerable: false, },
      loop: { enumerable: false, writable: true, value: null, },
      ctx: { get() { return ctx }, enumerable: false, },
    })

    this.gl = () => ctx ? ctx.gl : null
    this.fog = null
    this.regl = () => ctx ? ctx.regl : null
    this.lights = () => lights

    // functions
    this.cancel = () => (...args) => this.cancelFrame(...args)
    this.clear = () => (...args) => this.clearBuffers(...args)
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
          registerStat('Frame refresh')
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
      //...initialState,
      //time: ({time}) => time,
      //tick: ({tick}) => tick,
    })
  }
}

export class FrameState {
  constructor(ctx, initialState = {}) {
    Object.assign(this, { ...initialState })

    // remove alias properties this object
    delete this.blending
    delete this.culling

    this.frag = coalesce(
      initialState.frag,
      initialState.fragmentShader,
      kDefaultMaterialFragmentShader)

    this.blend = {
      ...kDefaultFrameBlendingState,
      ...(initialState.blend || initialState.blending)
    }

    this.cull = {
      ...kDefaultFrameCullingState,
      ...(initialState.cull|| initialState.culling)
    }

    this.depth = {
      ...kDefaultFrameDepthState,
      ...initialState.depth
    }

    // remove undefined/null values
    for (const key in this) {
      if (null == this[key]) {
        delete this[key]
      }
    }
  }
}
