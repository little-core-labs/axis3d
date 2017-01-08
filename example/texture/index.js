'use strict'

import {
  DirectionalLight,
  LambertMaterial,
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
const light = DirectionalLight(ctx)
const texture = Texture(ctx)
const material = LambertMaterial(ctx, {map: texture})
const rotation = new Quaternion()

const image = new Image();
image.src = 'texture.jpg'
image.onload = () => texture({data: image})

frame(({time}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], 0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera(() => {
    light({position: [20, 20, 10]})
    material(() => {
      sphere({rotation})
    })
  })
})
