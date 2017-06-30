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
  Fog,
} from '../../src'

import quat from 'gl-quat'

const ctx = new Context()

const fog = new Fog(ctx, {
  fcolor: [0.5, 0.5, 0.5, 1.0],
  famount: 0.025
})

const image = new Image()
image.src = 'assets/texture.jpg'

const texture = new Texture(ctx)

const camera = new PerspectiveCamera(ctx)
const sphere = new Mesh(ctx, { geometry: new SphereGeometry() })
const frame = new Frame(ctx)
const light = new DirectionalLight(ctx)
const material = new PhongMaterial(ctx, {fog: fog, map: texture})
const rotation = new Quaternion()

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.0)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], -0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation, position: [0, 0, 5]}, () => {

    light({intensity: 0.8, position: [0, 0, 10], ambient: 0.01})
    texture({data: image})
    fog()

    material({
      specular: new Color('dim gray'),
    }, () => {
      sphere({})
      sphere({position: [0,0,-2]})
      sphere({position: [0,0,-4]})
      sphere({position: [0,0,-6]})
    })

  })
})
