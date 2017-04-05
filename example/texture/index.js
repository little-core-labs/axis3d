'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  SphereGeometry,
  PhongMaterial,
  Quaternion,
  Texture,
  Context,
  Frame,
  Color,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()

const camera = PerspectiveCamera(ctx)
const sphere = Mesh(ctx, { geometry: SphereGeometry() })
const frame = Frame(ctx)
const light = DirectionalLight(ctx)
const texture = Texture(ctx)
const material = PhongMaterial(ctx, {map: texture})
const rotation = Quaternion()

const image = new Image()
image.src = 'assets/texture.jpg'

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], -0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation, position: [0, 0, 5]}, () => {
    light({intensity: 0.8, position: [0, 0, 10], ambient: 0.01})
    texture({data: image})
    material({specular: Color('dim gray') }, () => {
      sphere({})
    })
  })
})
