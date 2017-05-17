'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from '../stats'
import { Command } from './command'

import injectDefines from 'glsl-inject-defines'
import glslify from 'glslify'

/** @virtual {REGLFrameBuffer} https://github.com/regl-project/regl/blob/gh-pages/API.md#framebuffers */

/**
 * The default geometry buffer fragment shader.
 *
 * @public
 * @const
 * @type {String}
 * @see {@link https://www.npmjs.com/package/glslify}
 * @see {@link http://stack.gl}
 */

export const kDefaultGeometryBufferFragmentShader =
  glslify(__dirname + '/../glsl/geometry_buffer/frag.glsl')


export let globalfb
/**
 *
 * @public
 * @class GeometryBuffer
 * @extends Command
 */

export class GeometryBuffer extends Command {

  /**
   * GeometryBuffer class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   * @throws Error
   */

  constructor(ctx, initialState = {}) {
    if (!ctx.regl.hasExtension('webgl_draw_buffers')) {
      throw new Error("GeometryBuffer needs the 'webgl_draw_buffers' extension.")
    }

    incrementStat('GeometryBuffer')
    console.log('before update')
    super(update)
    console.log('after update')

    /**
     * GeometryBuffer state
     */

    const bufferState = new GeometryBufferState(ctx, initialState || {})

    /**
     * GeometryBuffer context
     */

    const {
      context = new GeometryBufferContext(ctx, bufferState, initialState)
    } = initialState

    /**
     * Regl command to capture geometry state into a framebuffer.
     */

    const captureGeometryBuffer = ctx.regl({ ...bufferState })

    /**
     * Injects a regl context so that viewport information can be
     * read and stored.
     */
console.log('injectContext in GeometryBuffer---')
    const injectContext = ctx.regl({ context })

    /**
     * Current viewport dimensions.
     */

    let currentViewportHeight = 0
    let currentViewportWidth = 0

    /**
     * GeometryBuffer update function.
     */
         // texture update function
    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      bufferState.update({
        ...initialState,
        ...state,
      })

      // inject texture context exposing useful
      // texture state variables
      injectContext(block)

      return this
    }

    // function update(state, block) {
    //   console.log('update start')
    //   console.log('state', state)
    //   console.log('block', block)
    //   let needsResize = false

    //   if ('function' == typeof state) {
    //     block = state
    //     state = {}
    //   }

    //   state = state || {}
    //   block = block || (() => void 0)

    //   injectContext(({viewportWidth, viewportHeight, clear}) => {
    //     if (viewportWidth != currentViewportWidth) {
    //       currentViewportWidth = viewportWidth
    //       needsResize = true
    //     }

    //     if (viewportHeight != currentViewportHeight) {
    //       currentViewportHeight = viewportHeight
    //       needsResize = true
    //     }

    //     if (needsResize) {
    //       console.log('state,,,', state)
    //       debugger
    //       try { globalfb.resize(currentViewportWidth, currentViewportHeight) }
    //       catch(err) {  }
    //       // catch(err) { ctx.emit('error', err) }
    //     }

    //     // captureGeometryBuffer(( Object.assign(args, state) ) => {
    //     captureGeometryBuffer((...args) => {
    //       console.log('B ***** args', args)
    //       Object.assign(args[0], state)
    //       console.log('AAAA ***** args', args)
    //       console.log('***** state', state)
    //       console.log('block', block)
    //       clear()
    //       block(...args)
    //     })
    //   })

    //   return this
    // }
  }
}

/**
 * GeometryBufferContext class.
 *
 * @public
 * @class GeometryBufferContext
 */

export class GeometryBufferContext {

  /**
   * GeometryBufferContext class constructor.
   *
   * @public
   * @param {!Context} ctx Axis3D context.
   * @param {!GeometryBufferState} geometryBufferState Required texture state.
   * @param {?Object} initialState Optional initial context state.
   */

  constructor(ctx, bufferState, initialState = {}) {
    // protected properties
    Object.defineProperties(this, {
      data: {
        enumerable: false,
        get() { return bufferState.data },
      },

      geometryBufferState: {
        enumerable: false,
        get() { return bufferState }
      },
    })

    /**
     * Underlying
     *
     * @public
     * @type {TypedArray|Array|Mixed}
     */

    this.bufferData = () => {
      return bufferState.data
    }

    /**
     * REGL framebuffer pointer.
     *
     * @public
     * @type {Function}
     */

    this.framebuffer = () => {
      return bufferState.framebuffer
    }
  }
}

/**
 * GeometryBufferState class.
 *
 * @public
 * @class GeometryBufferState
 */

export class GeometryBufferState {

  /**
   * GeometryBufferState class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    const {
      fbo = null,
      fragmentShader = kDefaultGeometryBufferFragmentShader,
      framebuffer = ctx.regl.framebuffer({
        color: [
          ctx.regl.texture({type: 'float'}), // albedo
          ctx.regl.texture({type: 'float'}), // normal
          ctx.regl.texture({type: 'float'}) // position
        ]
      }),
    } = initialState
console.log('B this', this)
    Object.assign(this, ...initialState)
console.log('A this', this)

    console.log('framebuffer', framebuffer)
    console.log('initialState', initialState)
debugger
    const shaderDefines = {}

    if (framebuffer.color && framebuffer.color[0]) {
      shaderDefines.HAS_ALBEDO = 1
    }

    if (framebuffer.color && framebuffer.color[1]) {
      shaderDefines.HAS_NORMALS = 1
    }

    if (framebuffer.color && framebuffer.color[2]) {
      shaderDefines.HAS_POSITIONS = 1
    }

    // let {data = null} = initialState

    // protected properties
    Object.defineProperties(this, {
      ctx: {
        enumerable: false,
        get() { return ctx },
      },

      // data: {
      //   enumerable: true,
      //   get() { return data || null },
      //   set(value) { data = value },
      // },

      framebuffer: {
        enumerable: true,
        get() { return framebuffer },
        // set(value) { framebuffer = value },
      },
    })

    /**
     * Internal GeometryBuffer framebuffer
     *
     * @public
     * @type {REGLFrameBuffer}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#framebuffers}
     */

    // this.framebuffer = framebuffer

    globalfb = framebuffer

    /**
     * GeometryBuffer fragment shader source string that
     * describes a program that writes pixels to the internal
     * framebuffer.
     *
     * @public
     * @type {String}
     */

    this.frag = injectDefines(fragmentShader, shaderDefines)
  }

    /**
   * Updates internal texture state. Returns true if the internal texture
   * was updated, otherwise false.
   *
   * @public
   * @method
   * @param {Object} state
   * @param {Object} state.data
   * @return {Boolean}
   * @throws TypeError
   */

  update({framebuffer = this.framebuffer} = {}) {
    const now = this.ctx.regl.now()
    let needsUpdate = false

    // if (Texture.isTextureDataReady(data)) {
    //   if (isVideo(data) && data.readyState >= HAVE_CURRENT_DATA) {
    //     needsUpdate = true
    //     if (now - this.lastVideoUpdate >= 0.01) {
    //       this.lastVideoUpdate = now
    //     }
    //   } else if (data != this.previouslyUploadedData) {
    //     needsUpdate = true
    //   }
    // }

    // if (needsUpdate) {
    //   // computed texture data resolution
    //   const resolution = Texture.getTextureDataResolution(this, data)
    //   // mark for update if resolution is available and
    //   // the previously uploaded texture data defers from
    //   // the current input data
    //   if (!(resolution[0] > 0 && resolution[1] > 0)) {
    //     needsUpdate = false
    //   }
    // }

    // update regl rexture state and set
    if (needsUpdate && data) {
      this.data = data
      // update underlying regl texture
      if ('function' == typeof this.framebuffer) {
        this.framebuffer(this)
      } else {
        throw new TypeError(
        `TextureState expects .texture to be a function. `+
        `Got ${typeof this.texture}.`)
      }
    }

    return needsUpdate
  }
}
