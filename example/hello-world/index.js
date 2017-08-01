import {
  PerspectiveCamera,
  Geometry,
  Material,
  Command,
  Context,
  Color,
  Frame,
  Mesh,
} from '../../src'

import { InstancedAttributesComponent } from '../../src'

import { BoxGeometry } from 'axis3d-geometry'

import ready from 'domready'
import Bunny from 'bunny'
import Stats from 'stats.js'
import quat from 'gl-quat'

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = new Context()
const material = new Material(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)

const box = new Mesh(ctx, {geometry: new BoxGeometry()})

const N = 10

const bunny = new Mesh(ctx, {
  geometry: new Geometry({complex: Bunny}),
  regl: { instances: N }
})

const materialX = new Material(ctx, {
  fragmentShader: `
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform

  #include <varying/color>
  #include <material/fragment/main>

  void Transform(inout vec4 fragColor, inout VaryingData data) {
    fragColor = data.color;
  }
  `,
  vertexShader: `
  #define GLSL_VERTEX_MAIN_TRANSFORM Transform

  attribute vec3 offset;
  #include <vertex/attributes/color>
  #include <varying/color>

  #include <mesh/vertex/main>
  void Transform(inout vec4 vertexPosition, inout VaryingData data) {
    vertexPosition.xyz += offset;
  }
  `
})

const attributes = new InstancedAttributesComponent(ctx, {
  color: Array(N*N).fill().map((_, i) => {
    const r = Math.floor(i / N) / N
    const g = (i % N) / N
    return [r, g, r * g + 0.2, 1]
  }),

  offset: Array(N*N).fill().map((_, i) => {
    return [i * 2, 0, 0]
  })
})

const rotation = quat.identity([])
const position = [15, 15, 15]
const angle = quat.identity([])
const color = new Color('blue')
const stats = new Stats()

ctx.on('error', (err) => console.error(err.stack || err))

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time, cancel, cancelAll}) {
  //cancel()
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      //bunny([ {position: [5, 5, 5]}, {position: [-5, -5, -5]} ])
    })

    attributes(() => {
      materialX({color}, ({fragmentShader, vertexShader}) => {
        //console.log(fragmentShader);
        //console.log(vertexShader);
        bunny(0)
        //cancelAll()
      })
    })
  })
}
