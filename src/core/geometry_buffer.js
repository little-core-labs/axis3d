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
    super(update)

    /**
     * GeometryBuffer state
     */

    const {state = new GeometryBufferState(ctx, initialState)} = initialState

    /**
     * Regl command to capture geometry state into a framebuffer.
     */

    const captureGeometryBuffer = ctx.regl({ ...state })

    /**
     * Injects a regl context so that viewport information can be
     * read and stored.
     */

    const injectContext = ctx.regl({})

    /**
     * Current viewport dimensions.
     */

    let currentViewportHeight = 0
    let currentViewportWidth = 0

    /**
     * GeometryBuffer update function.
     */

    function update(state, block) {
      let needsResize = false

      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || (() => void 0)

      injectContext(({viewportWidth, viewportHeight, clear}) => {
        if (viewportWidth != currentViewportWidth) {
          currentViewportWidth = viewportWidth
          needsResize = true
        }

        if (viewportHeight != currentViewportHeight) {
          currentViewportHeight = viewportHeight
          needsResize = true
        }

        if (needsResize) {
          try { fbo.resize(currentViewportWidth, currentViewportHeight) }
          catch(err) { ctx.emit('error', err) }
        }

        captureGeometryBuffer((...args) => {
          clear()
          block(...args)
        })
      })

      return this
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
      framebuffer = fbo || ctx.regl.framebuffer({
        color: [
          ctx.regl.texture({type: 'float'}), // albedo
          ctx.regl.texture({type: 'float'}), // normal
          ctx.regl.texture({type: 'float'}) // position
        ]
      })
    } = initialState

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

    /**
     * Internal GeometryBuffer framebuffer
     *
     * @public
     * @type {REGLFrameBuffer}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#framebuffers}
     */

    this.framebuffer = framebuffer

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
}
