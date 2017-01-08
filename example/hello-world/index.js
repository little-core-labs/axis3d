'use strict'

import {
  FlatMaterial,
  BoxGeometry,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()

const material = FlatMaterial(ctx)
const camera = Camera(ctx, {position: [0, 0, 3]})
const frame = Frame(ctx)
const box = Mesh(ctx, { geometry: BoxGeometry(ctx) })

const rotation = [0, 0, 0, 1]
const angle = [0, 0, 0, 1]

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.01)
  camera({rotation}, () => {
    material({color: [0, 0, 1, 1]}, () => {
      box({wireframe: true})
    })
  })
})
