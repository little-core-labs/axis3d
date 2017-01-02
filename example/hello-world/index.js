'use strict'

import {
  Material,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import { BoxGeometry } from 'axis3d/geometry'
import * as stats from 'axis3d/stats'
import quat from 'gl-quat'

const ctx = Context()

const rotation = [0, 0, 0, 1]
const material = Material(ctx)
const camera = Camera(ctx, {position: [0, 0, 5]})
const frame = Frame(ctx)
const angle = [0, 0, 0, 1]
const box = Mesh(ctx, { geometry: BoxGeometry(ctx) })

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.01)
  camera({rotation}, () => {
    material({color: [0, 0, 1, 1]}, () => {
      box({wireframe: true})
    })
  })
})
