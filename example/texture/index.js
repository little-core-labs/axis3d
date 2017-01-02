'use strict'

import {
  Material,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import { SphereGeometry } from 'axis3d/geometry'
import { Quaternion } from 'axis3d/math'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()

const camera = Camera(ctx, {position: [0, 0, 10]})
const sphere = Mesh(ctx, { geometry: SphereGeometry(ctx) })
const frame = Frame(ctx)
const image = new Image(); image.src = 'texture.jpg'
const texture = Texture(ctx, {data: image})
const material = Material(ctx, {map: texture})
const rotation = new Quaternion()

frame(({time}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], 0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation}, () => {
    material(() => {
      sphere()
    })
  })
})
