import {
  PerspectiveCamera,
  Shader,
  Component,
  Geometry,
  Material,
  Context,
  Frame,
  Mesh,
} from '../../src'

import PrimitiveCube from 'primitive-cube'

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
const Box = PrimitiveCube(20, 20, 20)
const bunny = new Mesh(ctx, {geometry: Bunny})
const box = new Mesh(ctx, {geometry: Box})

window.bunny = bunny

const rotation = quat.identity([])
const position = [25, 25, 25]
const angle = quat.identity([])
const color = [0, 0, 1]
const stats = new Stats()

ctx.on('error', (err) => console.error(err.message, err.stack || err))
window.ctx = ctx

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time, cancelAll}) {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, ({view}) => {
    material({color}, ({}) => {
      box({scale: 1, wireframe: true}, ({size, transform, matrix}) => {
        const [x, y, z] = size
        //const [x, y, z] = [20, 20, 20]
        bunny([
          {position: [0, 0, 0,]},
          {position: [0.5*x, 0.5*y, 0.5*z]},
          {position: [-0.5*x, -0.5*y, -0.5*z]},
          {position: [0.5*x, -0.5*y, 0.5*z]},
          {position: [-0.5*x, 0.5*y, -0.5*z]},
          {position: [0.5*x, 0.5*y, -0.5*z]},
          {position: [-0.5*x, -0.5*y, 0.5*z]},
          {position: [0.5*x, -0.5*y, -0.5*z]},
          {position: [-0.5*x, 0.5*y, 0.5*z]}
        ])
      })
    })
  })
}
