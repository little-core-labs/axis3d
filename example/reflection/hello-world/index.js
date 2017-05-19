'use strict'

import {
  PerspectiveCamera,
  FlatMaterial,
  BoxGeometry,
  Quaternion,
  Context,
  Vector3,
  Color,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()
const material = FlatMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)
const box = Mesh(ctx, {geometry: BoxGeometry()})

const rotation = Quaternion()
const position = Vector3(0, 0, 5)
const angle = Quaternion()
const color = Color('blue')

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      box({wireframe: true})
    })
  })
})
