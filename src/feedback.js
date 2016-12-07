'use strict'

/**
 * Module dependencies.
 */

import { SphereGeometry } from './geometry/sphere'
import { BoxGeometry } from './geometry/box'
import { Object3DCommand } from './object'
import glslify from 'glslify'
import mat4 from 'gl-mat4'

const defaultGeometry = new SphereGeometry({radius: 100})
const identity = mat4.identity([])

const frag = `
precision mediump float;

uniform float interpolation;
uniform sampler2D albedo;
uniform float opacity;
uniform float time;
varying vec2 vuv;

void main () {
  const int n = 1;
  float d = 0.01;
  vec4 source = texture2D(albedo, vuv);
  vec3 c = vec3(source.rgb);

  for (int i = 0; i < n; i++) {
    c += texture2D(albedo, vuv + vec2(+d, +d)).rgb;
    c += texture2D(albedo, vuv + vec2(-d, +d)).rgb;
    c += texture2D(albedo, vuv + vec2(+d, -d)).rgb;
    c += texture2D(albedo, vuv + vec2(-d, -d)).rgb;
    d *= 1.6 * float(i) + sin(time);
  }

  vec4 target = vec4(0.9*c/(1.0 + 4.0*float(n)), 1.0);
  gl_FragColor = mix(target, source, interpolation);
  gl_FragColor.a = opacity;
}
`

const vert = (glslify`
precision highp float;

uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;
attribute vec3 position;
varying vec2 vuv;

void main() {
  mat4 proj = projection * view * model;
  vuv = 0.5*(1.0 + position.xy);
  gl_Position = proj * vec4(position, 1.0);
}
`).split('\n').slice(1).join('\n')

/**
 * FeedbackCommand constructor.
 * @see FeedbackCommand
 */

module.exports = exports = (...args) => new FeedbackCommand(...args)

/**
 * FeedbackCommand class.
 *
 * @public
 * @class FeedbackCommand
 * @extends Command
 */

export class FeedbackCommand extends Object3DCommand {

  /**
   * FeedbackCommand class constructor.
   *
   * @param {Context} ctx
   */

  constructor(ctx, {interpolation = 1 - 0.11} = {}) {
    const regl = ctx.regl
    const texture = regl.texture()
    const fb = regl.framebuffer({color: texture})
    const draw = regl({
      vert,
      frag,
      depth: { enable: true },
      cull: { enable: true, face: 'back'},
      elements() {
        if (ctx.scope && ctx.scope.geometry) {
          return ctx.scope.geometry.cells
        } else {
          return defaultGeometry.cells
        }
      },

      attributes: {
        position() {
          if (ctx.scope && ctx.scope.geometry) {
            return ctx.scope.geometry.positions
          } else {
            return defaultGeometry.positions
          }
        }
      },

      uniforms: {
        interpolation: (_, {interpolation: newInterpolation} = {}) => {
          return newInterpolation || interpolation
        },

        opacity: (ctx, {opacity}) => null != opacity ? opacity : 1,
        albedo: () => texture,

        // 3d
        projection: ({projection}) => projection || identity,
        model: ({local}) => mat4.multiply([], ctx.scope.local || identity, local),
        view: ({view}) => view || identity,
      },

      blend: {
        enable: true,
        func: {
          src: 'src alpha',
          dst: 'one minus src alpha'
        },
      },
    })

    super(ctx, {
      inherit: true,
      draw: (state = {}, block = () => void 0) => {
        if ('function' == typeof state) {
          block = state
          state = {}
        }

        block()
        if (ctx.reglContext) {
          texture({
            copy: true,
            mag: 'linear',
            min: 'linear'
          })
          draw(state || {})
        }
      }
    })

    this.type = 'feedback'
  }
}
