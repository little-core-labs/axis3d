'use strict'

import {
  PerspectiveCamera,
  FlatMaterial,
  BoxGeometry,
  Quaternion,
  Command,
  Context,
  Vector3,
  Color,
  Frame,
  Mesh,
} from '../../src'

import { typeOf, instanceOf } from '../../src/core/types'

import quat from 'gl-quat'

const ctx = new Context()
const material = new FlatMaterial(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const box = new Mesh(ctx, {geometry: new BoxGeometry()})

const rotation = new Quaternion()
const position = new Vector3(0, 0, 5)
const angle = new Quaternion()
const color = new Color('blue')

console.log(frame instanceof Command)
console.log(typeOf(frame), instanceOf(frame, Command))

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      box({wireframe: true})
    })
  })
})
