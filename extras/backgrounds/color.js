'use strict'

/**
 * Module depdendencies.
 */

import { Command } from 'axis3d/command'
import { Vector } from 'axis3d/math/vector'
import glslify from 'glslify'

const vert = glslify(__dirname + '/glsl/color/vert.glsl')
const frag = glslify(__dirname + '/glsl/color/frag.glsl')

export const DEFAULT_COLOR = new Vector(121/255.0, 117/255.0, 114/255.0, 1)

/**
 * ColorBackgroundCommand constructor.
 * @see ColorBackgroundCommand
 */

module.exports = exports = (...args) => new ColorBackgroundCommand(...args)

/**
 * ColorBackgroundCommand class.
 *
 * @public
 * @class ColorBackgroundCommand
 */

export class ColorBackgroundCommand extends Command {
  constructor(ctx, {
    reduction = 1.0,
    boost = 1.0,
    color = DEFAULT_COLOR,
  } = {}) {
    let draw = null
    const {regl} = ctx
    const configure = () => draw = regl({
      vert, frag,
      uniforms: {
        height: regl.context('viewportHeight'),
        width: regl.context('viewportWidth'),
        color: [...color],
      },
      attributes: {position: [-4, -4, 4, -4, 0, 4]},
      depth: {enable: false, mask: false},
      count: 3
    })

    configure()
    super((_, block, scope) => {
      let needsConfiguration = false
      if ('object' == typeof block) {
        if ('color' in block) {
          if ('object' == typeof block.color &&
             block.color == block.color &&
             color != block.color) {
             if (color[0] != block.color[0] ||
                 color[1] != block.color[1] ||
                 color[2] != block.color[2] ||
                 color[3] != block.color[3]) {
              color = block.color
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
