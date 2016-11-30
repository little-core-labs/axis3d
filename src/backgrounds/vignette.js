'use strict'

/**
 * Module depdendencies.
 */

import injectDefines from 'glsl-inject-defines'
import { Command } from '../command'
import { Vector } from '../math/vector'
import glslify from 'glslify'

const vert = glslify(__dirname + '/../glsl/backgrounds/vignette/vert.glsl')
const frag = glslify(__dirname + '/../glsl/backgrounds/vignette/frag.glsl')

export const DEFAULT_COLOR = new Vector(121/255.0, 117/255.0, 114/255.0, 1)

/**
 * VignetteBackgroundCommand constructor.
 * @see VignetteBackgroundCommand
 */

export default (...args) => new VignetteBackgroundCommand(...args)

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
    map = null
  } = {}) {
    let draw = null
    const {regl} = ctx
    const configure = () => {
      const defines = {}
      const uniforms = {
        interpolation: mix,
        reduction: reduction,
        height: regl.context('viewportHeight'),
        width: regl.context('viewportWidth'),
        color: [...color],
        scale: [...scale],
        boost: boost,
        noise: noise,
      }

      if (null == map) {
        delete defines.HAS_MAP
        delete uniforms.isMapLoaded
        delete uniforms.map
      } else if (null !== map.texture) {
        defines.HAS_MAP = ''
        uniforms.isMapLoaded = () => {
          if ('function' == typeof map && map.texture) {
            map()
          }

          if (null != map.isDoneLoading && null != map.hasProgress) {
            return Boolean(map.isDoneLoading || map.hasProgress)
          } else {
            return true
          }
        }

        uniforms.map = () => {
          if ('function' == typeof map) { map() }
          return map.texture || map
        }
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

    configure()
    super((_, block, scope) => {
      let needsConfiguration = false
      if ('object' == typeof block) {
        if ('reduction' in block) {
          if ('number' == typeof block.reduction &&
             block.reduction == block.reduction &&
             reduction != block.reduction) {
            reduction = block.reduction
            needsConfiguration = true
          }
        }

        if ('boost' in block) {
          if ('number' == typeof block.boost &&
             block.boost == block.boost &&
             boost != block.boost) {
            boost = block.boost
            needsConfiguration = true
          }
        }

        if ('noise' in block) {
          if ('number' == typeof block.noise &&
             block.noise == block.noise &&
             noise != block.noise) {
            noise = block.noise
            needsConfiguration = true
          }
        }

        if ('mix' in block) {
          if ('number' == typeof block.mix &&
             block.mix == block.mix &&
             mix != block.mix) {
            mix = block.mix
            needsConfiguration = true
          }
        }


        if ('map' in block) {
          if (map != block.map) {
            map = block.map
            needsConfiguration = true
          }
        }

        if ('color' in block) {
          if ('object' == typeof block.color) {
             if (color[0] != block.color[0] ||
                 color[1] != block.color[1] ||
                 color[2] != block.color[2] ||
                 color[3] != block.color[3]) {
              color = block.color
              needsConfiguration = true
            }
          }
        }

        if ('scale' in block) {
          if ('object' == typeof block.scale) {
             if (scale[0] != block.scale[0] ||
                 scale[1] != block.scale[1] ||
                 scale[2] != block.scale[2]) {
              scale = block.scale
              needsConfiguration = true
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
