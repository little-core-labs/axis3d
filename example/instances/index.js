import {
  ShaderInstancedAttributes,
  PerspectiveCamera,
  Geometry,
  Material,
  Command,
  Context,
  Frame,
  Mesh,
} from '../../src'

import { BoxGeometry } from 'axis3d-geometry'

import ready from 'domready'
import Bunny from 'bunny'
import Stats from 'stats.js'
import quat from 'gl-quat'

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

const N = 10

const ctx = new Context()
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const bunny = new Mesh(ctx, {
  geometry: new Geometry({complex: Bunny}),
  regl: { instances: N }
})

const material = new Material(ctx, {
  fragmentShader: () => `
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform
  #include <varying/color>
  #include <material/fragment/main>

  void Transform(inout vec4 fragColor, inout VaryingData data) {
    fragColor = data.color;
  }
  `,

  vertexShader: () => `
  #define GLSL_VERTEX_MAIN_TRANSFORM Transform
  #include <vertex/attributes/position>
  #include <vertex/attributes/color>
  #include <varying/color>
  #include <time/time>

  #include <mesh/vertex/main>

  attribute vec3 offset;
  void Transform(inout vec4 vertexPosition, inout VaryingData data) {
    float time = GetTime();
    vertexPosition.xyz += vec3(
      time*cos(offset.x),
      time*sin(offset.y),
      0.0);
  }
  `
})

const attributes = new ShaderInstancedAttributes(ctx, {
  offset: Array(N*N).fill().map((_, i) => {
    const x = -1 + 2 * Math.floor(i / N) / N + 0.1
    const y = -1 + 2 * (i % N) / N + 0.1
    return [x, y, 0]
  }),

  color: Array(N*N).fill().map((_, i) => {
    const r = Math.floor(i / N) / N
    const g = (i % N) / N
    return [r, g, r * g + 0.2, 1]
  }),
})

const rotation = quat.identity([])
const position = [15, 15, 15]
const angle = quat.identity([])
const stats = new Stats()

ctx.on('error', (err) => console.error(err.stack || err))

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time}) {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    attributes(() => {
      material(({vertexShader, fragmentShader}) => {
        bunny()
      })
    })
  })
}
