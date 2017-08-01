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

const box = new Mesh(ctx, {geometry: new BoxGeometry({x: 20, y: 20, z: 20})})
const bunny = new Mesh(ctx, {geometry: new Geometry({complex: Bunny}) })

const rotation = quat.identity([])
const position = [25, 25, 25]
const angle = quat.identity([])
const color = new Color('blue')
const stats = new Stats()

ctx.on('error', (err) => console.error(err.stack || err))

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time, cancel, cancelAll}) {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      box({wireframe: true, scale: 1}, ({transform, size}) => {
        const [x, y, z] = size
        bunny([
          {position: [0, 0, 0,]},
          {position: [0.5*x, 0.5*y, 0.5*z]},
          {position: [-0.5*x, -0.5*y, -0.5*z]},

          {position: [0.5*x, -0.5*y, 0.5*z]},
          {position: [-0.5*x, 0.5*y, -0.5*z]},

          {position: [0.5*x, 0.5*y, -0.5*z]},
          {position: [-0.5*x, -0.5*y, 0.5*z]},

          {position: [0.5*x, -0.5*y, -0.5*z]},
          {position: [-0.5*x, 0.5*y, 0.5*z]},

        ])
      })
    })
  })
}
