'use strict'

/**
 * Module dependencies.
 */

import { kDefaultMaterialFragmentShader } from './material'
import { incrementStat, registerStat } from '../stats'
import { Command } from './command'
import { define } from '../utils'
import { Color } from './color'

import coalesce from 'defined'

/**
 * The default WebGL blending state for every frame.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#blending}
 */

export const kDefaultFrameBlendingState = Object.seal({
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: {
    src: 'src alpha',
    dst: 'one minus src alpha'
  },
})

/**
 * The default WebGL culling state for every frame.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#culling}
 */

export const kDefaultFrameCullingState = Object.seal({
  enable: true,
  face: 'back',
})

/**
 * The default WebGL depth buffer state for every frame.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer}
 */

export const kDefaultFrameDepthState = Object.seal({
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true,
})

/**
 * The default WebGL clear buffer state for every frame.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#clear-the-draw-buffer}
 */

export const kDefaultFrameClearState = Object.seal({
  color: [17/255, 17/255, 17/255, 1],
  depth: 1,
})

/**
 * The Frame class represents a command that abstracts a render
 * loop.
 *
 * @public
 * @class Frame
 * @extends Command
 */

export class Frame extends Command {

  /**
   * Frame class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    incrementStat('Frame')
    super(update)

    const uniforms = new FrameUniforms(ctx, initialState.uniforms || {})
    const context = new FrameContext(ctx, initialState.context || {})
    const state = new FrameState(ctx, initialState.state || {})

    const injectContext = ctx.regl({
      uniforms,
      context,
      ...state
    })

    function update(refresh) {
      context.init(injectContext).enqueue(refresh)
      return () => {
        context.cancelFrame()
      }
    }
  }
}

/**
 * FrameContext class.
 *
 * @public
 * @class FrameContext
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#context}
 */

export class FrameContext {

  /**
   * FrameContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState = {}) {
    Object.assign(this, initialState)

    /**
     * The default WebGL clear buffer state for every frame.
     */

    const clearState = {
      ...kDefaultFrameClearState,
      ...initialState.clear
    }

    /**
     * Known lights in a frame context.
     */

    const lights = []

    /**
     * Known refresh functions.
     */

    const queue = []

    // protected properties
    Object.defineProperties(this, {
      reglContext: {
        enumerable: false,
        writable: true,
        value: null,
      },

      isCancelled: {
        enumerable: false,
        writable: true,
        value: false,
      },

      clearState: {
        get() { return clearState },
        enumerable: false,
      },

      queue: {
        get() { return queue },
        enumerable: false,
      },

      loop: {
        enumerable: false,
        writable: true,
        value: null,
      },

      ctx: {
        get() { return ctx },
        enumerable: false,
      },
    })

    /**
     * Known lights in a frame context
     *
     * @public
     * @type {Array<Light>}
     */

    this.lights = () => {
      return lights
    }

    /**
     * Cancels the frame loop.
     *
     * @public
     * @type {Function}
     */

    this.cancel = () => {
      return (...args) => {
        this.cancelFrame(...args)
      }
    }

    /**
     * Clears drawing buffers.
     *
     * @public
     * @type {Function}
     */

    this.clear = () => {
      return (...args) => {
        this.clearBuffers(...args)
      }
    }

    /**
     * A reference to the underlying regl instance.
     *
     * @public
     * @type {regl}
     */

    this.regl = () => {
      return ctx.regl
    }

    /**
     * A reference to the underlying WebGl instance.
     *
     * @public
     * @type {WebGLRenderingContext}
     */

    this.gl = () => {
      return ctx.gl
    }
  }

  /**
   * Enqueues a refresh function that is called
   * for every frame refresh loop.
   *
   * @public
   * @method
   * @param {Function} refresh
   * @return {FrameContext}
   */

  enqueue(refresh) {
    this.queue.push(refresh)
    return this
  }

  /**
   * Dequeues all enqueued frame refresh functions.
   *
   * @public
   * @method
   * @param {...Mixed} args
   * @return {FrameContext}
   */

  dequeue(...args) {
    for (const refresh of this.queue) {
      if ('function' == typeof refresh) {
        refresh(this.reglContext, ...args)
      }
    }
    return this
  }

  /**
   * Initializes frame context with a function
   * that injects a regl context.
   *
   * @public
   * @method
   * @param {Function} inject
   * @return {FrameContext}
   */

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

  /**
   * Cancels the frame loop. This function will remove
   * all enqueued refresh functions.
   *
   * @public
   * @method
   */

  cancelFrame() {
    if (this.loop) {
      this.queue.splice(0, -1)
      this.loop.cancel()
      this.ctx._reglContext =
      this.reglContext =
      this.loop = null
    }
  }

  /**
   * Clears WebGL clear and depth buffers.
   *
   * @public
   * @method
   */

  clearBuffers(state) {
    this.ctx.regl.clear({ ...this.clearState, ...state})
  }

  /**
   * Internal refresh callback.
   *
   * @private
   */

  onrefresh(reglContext, ...args) {
    this.reglContext = reglContext
    this.ctx._reglContext = reglContext
    this.clearBuffers()
    reglContext.lights.splice(0, reglContext.lights.length)
    this.dequeue(...args)
  }
}

/**
 * The FrameUniforms class represents an object of
 * all injected uniforms for a frame render loop.
 *
 * @public
 * @class FrameUniforms
 */

export class FrameUniforms {

  /**
   * FrameUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    Object.assign(this, initialState)

    /**
     * Total time ellapsed in seconds since the frame
     * was initialized.
     *
     * @public
     * @type {Number}
     */

    this.time = ({time}) => {
      return time
    }

    /**
     * The number of times/loops a frame has
     * been refreshed/rendered.
     *
     * @public
     * @type {Number}
     */

    this.tick = ({tick}) => {
      return tick
    }
  }
}

/**
 * The FrameState class represents WebGL state that is injected
 * each frame refresh.
 *
 * @public
 * @class FrameState
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md}
 */

export class FrameState {

  /**
   * FrameState class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    Object.assign(this, {
      ...initialState,
    })

    // remove alias properties this object
    delete this.blending
    delete this.culling

    /**
     * Default fragment applied to the frame context scope.
     *
     * @public
     * @type {String}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#shaders}
     */

    this.frag = coalesce(
      initialState.frag,
      initialState.fragmentShader,
      kDefaultMaterialFragmentShader)

    /**
     * Blending state for every frame loop.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultFrameBlendingState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#blending}
     */

    this.blend = {
      ...kDefaultFrameBlendingState,
      ...(initialState.blend || initialState.blending)
    }

    /**
     * Culling state for every frame loop.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultFrameCullingState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#culling}
     */

    this.cull = {
      ...kDefaultFrameCullingState,
      ...(initialState.cull|| initialState.culling)
    }

    /**
     * Depth buffer state for every frame loop.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultFrameDepthState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer}
     */

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
