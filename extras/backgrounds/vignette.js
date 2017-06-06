'use strict'

/**
 * Module depdendencies.
 */

import { Command, Vector4 } from '../../src'
import injectDefines from 'glsl-inject-defines'
import glslify from 'glslify'

const vert = glslify(__dirname + '/glsl/vignette/vert.glsl')
const frag = glslify(__dirname + '/glsl/vignette/frag.glsl')

export const DEFAULT_COLOR = new Vector4(121/255.0, 117/255.0, 114/255.0, 1)

/**
 * VignetteBackgroundCommand constructor.
 * @see VignetteBackgroundCommand
 */

module.exports = exports = (...args) => new VignetteBackgroundCommand(...args)

/**
 * VignetteBackgroundCommand class.
 *
 * @public
 * @class VignetteBackgroundCommand
 */

export class VignetteBackgroundCommand extends Command {
  constructor(ctx, {
    reduction = 1.0,
    scale = [1.0, 1.0, 1.-1],
    noise = 0.05,
    boost = 1.0,
    color = DEFAULT_COLOR,
    mix = 1.0,
  } = {}) {
    let draw = null
    const {regl} = ctx
    const configure = () => {
      const defines = {}
      const uniforms = {
        interpolation: () => mix,
        resolution: ({resolution}) => resolution,
        reduction: () => reduction,
        height: regl.context('viewportHeight'),
        width: regl.context('viewportWidth'),
        color: () => [...color],
        scale: () => [...scale],
        boost: () => boost,
        noise: () => noise,
      }

      draw = regl({
        vert: injectDefines(vert, defines),
        frag: injectDefines(frag, defines),
        uniforms,
        attributes: {position: [-4, -4, 4, -4, 0, 4]},
        depth: {enable: false, mask: false},
        count: 3
      })
    }

    super((block, scope) => {
      let needsConfiguration = draw ? false : true
      const isNumber = (n) => n == n && 'number' == typeof n
      if ('object' == typeof block) {
        if ('reduction' in block) {
          if (isNumber(block.reduction) && reduction != block.reduction) {
            reduction = block.reduction
          }
        }

        if ('boost' in block) {
          if (isNumber(block.boost) && boost != block.boost) {
            boost = block.boost
          }
        }

        if ('noise' in block) {
          if (isNumber(block.noise) && noise != block.noise) {
            noise = block.noise
          }
        }

        if ('mix' in block) {
          if (isNumber(block.mix) && mix != block.mix) {
            mix = block.mix
          }
        }

        if ('color' in block) {
          if ('object' == typeof block.color) {
            if (color[0] != block.color[0] ||
                color[1] != block.color[1] ||
                color[2] != block.color[2] ||
                color[3] != block.color[3]) {
              color = block.color
            }
          }
        }

        if ('scale' in block) {
          if ('object' == typeof block.scale) {
            if (scale[0] != block.scale[0] ||
                scale[1] != block.scale[1] ||
                scale[2] != block.scale[2]) {
              scale = block.scale
            }
          }
        }
      }

      if (needsConfiguration) {
        configure()
      }

      draw(block, scope)
    })
  }
}
