'use strict'

/**
 * Module dependencies.
 */

import { Command } from '../command'
import { Vector } from '../math/vector'
import GBuffer from '../gbuffer'
import glslify from 'glslify'
import clamp from 'clamp'

const vert = glslify(__dirname + '/../glsl/light/ambient/vert.glsl')
const frag = glslify(__dirname + '/../glsl/light/ambient/frag.glsl')

/**
 * AmbientLightCommand class constructor alias.
 * @see AmbientLightCommand
 */

module.exports = exports = (...args) => new AmbientLightCommand(...args)

/**
 * AmbientLightCommand class.
 *
 * @public
 * @class AmbientLightCommand
 * @extends Command
 */

export class AmbientLightCommand extends Command {
  constructor(ctx, {
    intensity = 1.0,
    color = new Vector(1.0, 1.0, 1.0, 1.0),
  } = {}) {
    const {regl} = ctx
    const textures = {albedo: regl.texture({type: 'float'})}
    const fbo = regl.framebuffer({color: [textures.albedo]})
    const gbuffer = GBuffer(ctx, {fbo})
    const draw = regl({
      vert, frag,
      uniforms: {
        normalTexture: () => textures.normal,
        intensity: () => clamp(intensity, -1, 1),
        color: () => [...color],
      },

      attributes: {position: [[-4, -4], [4, -4], [0, 4]]},
      depth: {enable: false},
      count: 3,
    })

    super((_, block, scope) => {
      if ('function' == typeof block) {
        scope = block
        block = {}
      }

      block = block || {}
      scope = scope || (() => void 0)

      if ('color' in block) {
        if ('object' == typeof block.color) {
          if (color[0] != block.color[0] ||
              color[1] != block.color[1] ||
              color[2] != block.color[2] ||
              color[3] != block.color[3]) {
            Object.assign(color, block.color)
          }
        }
      }

      if ('intensity' in block) {
        if ('number' == typeof block.intensity &&
            block.intensity == block.intensity) {
          intensity = block.intensity
        }
      }

      gbuffer((...args) => { scope(...args) })
      draw()
    })
  }
}
