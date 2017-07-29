'use strict'

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

import Bunny from 'bunny'
import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = new Context()
const material = new Material(ctx, {})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const bunny = new Mesh(ctx, {geometry: new Geometry({complex: Bunny})})

const rotation = quat.identity([])
const position = [15, 15, 15]
const angle = quat.identity([])
const color = new Color('blue')
const stats = new Stats()

ready(() => document.body.appendChild(stats.dom))

frame(() => stats.begin())

frame(({time, clear}) => {
  clear()
  //clear({color: [0, 0, 0, 1] })
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      bunny()
    })
  })
})

frame(() => stats.end())
