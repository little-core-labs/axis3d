'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from './stats'
import injectDefines from 'glsl-inject-defines'
import { Command } from './command'
import { Vector } from './math/vector'
import glslify from 'glslify'

const frag = glslify(__dirname + '/glsl/geometry_buffer/frag.glsl')

module.exports = exports = (...args) => new GeometryBufferComand(...args)
export class GeometryBufferComand extends Command {
  constructor(ctx, {fbo = null} = {}) {
    incrementStat('GeometryBuffer')
    const {regl} = ctx

    if (!regl.hasExtension('webgl_draw_buffers')) {
      throw new Error("GeometryBufferComand needs the 'webgl_draw_buffers' extension.")
    }

    fbo = fbo || regl.framebuffer({
      color: [
        regl.texture({type: 'float'}), // albedo
        regl.texture({type: 'float'}), // normal
        regl.texture({type: 'float'}) // position
      ]
    })

    const defines = {}

    if (fbo.color && fbo.color[0]) {
      defines.HAS_ALBEDO = ''
    }

    if (fbo.color && fbo.color[1]) {
      defines.HAS_NORMALS = ''
    }

    if (fbo.color && fbo.color[2]) {
      defines.HAS_POSITIONS = ''
    }

    const captureGeometryBuffer = regl({
      framebuffer: fbo,
      frag: injectDefines(frag, defines),
    })

    let viewportHeight = 0
    let viewportWidth = 0
    super((block, scope) => {
      let needsResize = false

      if ('function' == typeof block) {
        scope = block
        block = {}
      }

      block = block || {}
      scope = scope || (() => void 0)

      if (viewportWidth != ctx.reglContext.viewportWidth) {
        viewportWidth = ctx.reglContext.viewportWidth
        needsResize = true
      }

      if (viewportHeight != ctx.reglContext.viewportHeight) {
        viewportHeight = ctx.reglContext.viewportHeight
        needsResize = true
      }

      if (needsResize) {
        try { fbo.resize(viewportWidth, viewportHeight) }
        catch(e) {console.error(e)}
      }

      captureGeometryBuffer((...args) => {
        ctx.clear()
        scope(...args)
      })
    })
  }
}
