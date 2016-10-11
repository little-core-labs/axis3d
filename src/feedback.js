'use strict'

/**
 * Module dependencies.
 */

import { MeshCommand } from './mesh'

/**
 * FeedbackCommand constructor.
 * @see FeedbackCommand
 */

export default (...args) => new FeedbackCommand(...args)

/**
 * FeedbackCommand class.
 *
 * @public
 * @class FeedbackCommand
 * @extends MeshCommand
 */

export class FeedbackCommand extends MeshCommand {

  /**
   * FeedbackCommand class constructor.
   *
   * @param {Context} ctx
   */

  constructor(ctx, opts = {}) {
    const regl = ctx.regl
    const texture = regl.texture()
    const fb = regl.framebuffer({color: texture})
    super(ctx, {
      ...opts,
      type: 'feedback',
      uniforms: {
        texture: texture,
        time: regl.context('time'),
      },
      geometry: {
        primitive: {
          count: 3,
          positions: [
            -4, +4,
            -4, -4,
            +4, +0,
          ]
        }
      },
      frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform float time;
      varying vec2 uv;
      void main () {
        float d = 0.001;
        vec3 c = texture2D(texture,uv).rgb;
        const int n = 8;
        for (int i = 0; i < n; i++) {
          c += texture2D(texture,uv+vec2(d,d)).rgb;
          c += texture2D(texture,uv+vec2(-d,d)).rgb;
          c += texture2D(texture,uv+vec2(d,-d)).rgb;
          c += texture2D(texture,uv+vec2(-d,-d)).rgb;
          d *= 1.6;
        }
        gl_FragColor = vec4(c*0.9/(1.0+float(n)*4.0),1);
      }
      `,
      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
      uv = (1.0+position)*0.5;
        gl_Position = vec4(position,0,1);
      }
      `,
      before(state, block) {

        texture({copy: true, mag: 'linear', min: 'linear'})
        if ('function' == typeof ctx.previous) {
          ctx.previous({framebuffer: fb})
          //console.log(ctx.previous.type)
        }
        //debugger
      }
    })
  }
}
