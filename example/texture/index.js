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
} from '../../src'

import quat from 'gl-quat'

const ctx = new Context()

const camera = new PerspectiveCamera(ctx)
const sphere = new Mesh(ctx, { geometry: new SphereGeometry() })
const frame = new Frame(ctx)
const light = new DirectionalLight(ctx)
const texture = new Texture(ctx)
const material = new PhongMaterial(ctx, {map: texture})
const rotation = new Quaternion()

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
    material({specular: new Color('dim gray') }, () => {
      sphere({})
    })
  })
})
