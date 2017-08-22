import {
  TextureShaderUniforms,
  PerspectiveCamera,
  ShaderAttributes,
  ShaderUniforms,
  FrameBuffer,
  Component,
  Geometry,
  Material,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from '../../src'

import ScreenProjectedLines from 'screen-projected-lines'
import PrimitiveCube from 'primitive-cube'
import * as eases from 'eases'
import ready from 'domready'
import Stats from 'stats.js'
import Bunny from 'bunny'
import clamp from 'clamp'
import quat from 'gl-quat'

const glsl = require('glslify')

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = new Context()

const framebuffer = new FrameBuffer(ctx)
const material = new Material(ctx)
const texture = new Texture(ctx)
const frame = new Frame(ctx)

const identityCamera = new Camera(ctx)
const perspective = new PerspectiveCamera(ctx)

const bunnyGeometry = new Geometry(ScreenProjectedLines(Bunny))
const boxGeometry = new Geometry(ScreenProjectedLines(PrimitiveCube(20, 20, 20)))

const uniforms = new ShaderUniforms(ctx, {
  thickness({}, {thickness} = {}) {
    return thickness || 0.5;
  }
})

const boxAttributes = new ShaderAttributes(ctx, {
  nextPosition: boxGeometry.complex.nextPositions,
  direction: boxGeometry.complex.directions,
})

const bunnyAttributes = new ShaderAttributes(ctx, {
  nextPosition: bunnyGeometry.complex.nextPositions,
  direction: bunnyGeometry.complex.directions,
})

const triangle = new Mesh(ctx, {
  geometry: {positions: [[-4, -4], [4, -4], [0, 4]]}
})

const libglsl = {
  linevoffset: glsl`#pragma glslify: linevoffset = require('screen-projected-lines')`,
  noise: glsl`#pragma glslify: snoise = require('glsl-noise/simplex/4d')`,
}

const vertexShader = `
#define GLSL_MESH_HAS_POSITION
#define GLSL_VERTEX_MAIN_TRANSFORM Transform

#include "linevoffset"
#include "noise"

#include <time/time>
#include <frame/frame>
#include <frame/uniforms>
#include <varying/uv>
#include <varying/emit/uv>
#include <mesh/vertex/main>

attribute vec3 nextPosition;
attribute float direction;
uniform float thickness;

vec3 xpos (vec3 p) {
  return (1.0 + snoise(vec4(p, GetTime()*0.2))*0.4) * p;
}

void Transform(inout vec4 vertexPosition, inout VaryingData data) {
  float aspect = frame.resolution.x/frame.resolution.y;
  mat4 proj = camera.projection * camera.view * mesh.model;
  vec4 p = proj*vec4(xpos(position), 1.0);
  vec4 n = proj*vec4(xpos(nextPosition), 1.0);
  vec4 offset = linevoffset(p, n, direction, aspect);
  vertexPosition = p + offset * thickness;
}
`

const box = new Mesh(ctx, {
  geometry: boxGeometry,
  glsl: libglsl,
  vertexShader,
})

const bunny = new Mesh(ctx, {
  geometry: bunnyGeometry,
  glsl: libglsl,
  vertexShader,
})

const rotation = quat.identity([])
const position = [0, 0, 25]
const angle = quat.identity([])
const color = [0, 0.5, 1]
const stats = new Stats()

const feedbackMaterial = Component.compose(
  new TextureShaderUniforms(ctx),
  new Material(ctx, {
    glsl: libglsl,
    fragmentShader({textureUniformName, textureData}) {
      return `
        #define GLSL_FRAGMENT_MAIN_AFTER After
        #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform
        #define RADIUS 0.95
        #define SOFTNESS 0.125
        #define SEPIA 4.0*vec3(1.2, 1.0, 0.8)

        #include "./noise"

        #include <texture/2d>
        #include <varying/uv>
        #include <varying/read>
        #include <varying/data>
        #include <frame/frame>
        #include <frame/uniforms>
        #include <fragment/main>
        #include <time/time>

        uniform Texture2D ${textureUniformName};

        void Main(inout vec4 fragColor, inout VaryingData data) {
          fragColor = texture2D(${textureUniformName}.data, data.uv);
          fragColor.a = 1.0;
        }

        void After(inout vec4 fragColor, inout VaryingData data) {
          vec2 position = (gl_FragCoord.xy / frame.resolution.xy) - vec2(0.5);
          float len = length(position);
          float vignette = smoothstep(RADIUS, RADIUS-SOFTNESS, len);
          fragColor.rgb = mix(fragColor.rgb, fragColor.rgb * vignette, 0.5);
          float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
          vec3 sepiaColor = vec3(gray) * SEPIA;
          fragColor.rgb = mix(fragColor.rgb, sepiaColor, 0.2);
        }

        void Transform(inout vec4 fragColor, inout VaryingData data) {
          const int n = 16;
          float d = 0.001;
          vec3 c = texture2D(${textureUniformName}.data, data.uv).rgb;
          for (int i = 0; i < n; i++) {
            c += texture2D(${textureUniformName}.data,data.uv+vec2(d,d)).rgb;
            c += texture2D(${textureUniformName}.data,data.uv+vec2(-d,d)).rgb;
            c += texture2D(${textureUniformName}.data,data.uv+vec2(d,-d)).rgb;
            c += texture2D(${textureUniformName}.data,data.uv+vec2(-d,-d)).rgb;
            d *= 1.6;
          }
          fragColor.rgb = c*0.9/(1.0+float(n)*2.0); // blur
          float l = pow(abs(snoise(vec4(data.position, GetTime()*0.2))), 0.5)*0.5+0.5;
          fragColor.rgb *= l;
        }
        `
    },

    vertexShader() {
      return `
      #define GLSL_MESH_HAS_POSITION
      #define GLSL_VERTEX_MAIN_AFTER After

      #include <varying/uv>
      #include <varying/emit/uv>
      #include <mesh/vertex/main>

      void After(inout vec4 vertexPosition, inout VaryingData data) {
        EmitVaryingUvs(0.5 * (vertexPosition.xy + 1.0));
      }
      `
    }
  })
)

ctx.on('error', (err) => console.error(err.stack || err))

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time, clear, cancel, cancelAll}) {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  texture(() => {
    perspective({rotation, position}, () => {
      framebuffer(() => {
        material({color: [0.2, 0.5, 0.8]}, () => {
          const t = clamp(Math.cos(0.125*time), 0, 1)
          const f = 0.5 - (0.1 + eases.cubicInOut(t))
          uniforms({thickness: f}, () => {
            boxAttributes(() => {
              box({scale: 1}, () => {
                material({color: [0.8, 0.3, 0.4]}, () => {
                  bunnyAttributes(() => {
                    const t = clamp(Math.cos(0.5*time), 0, 1)
                    const f = 0.25 - (0.1 + eases.cubicInOut(t))
                    uniforms({thickness: f}, () => {
                      bunny({})
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

    // render feedback
    identityCamera(() => {
      feedbackMaterial(() => { triangle() })
    })
  })
}
