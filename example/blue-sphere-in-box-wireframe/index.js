'use strict'

import { OrbitCameraController } from '../../extras/controller'
import quat from 'gl-quat'

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Sphere,
  Box,
} from 'axis3d/mesh'

import {
  Orientation,
  Touch,
  Mouse,
} from 'axis3d/input'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx, {position: [0, 0, 5]})
const orientation =  Orientation(ctx)
const mouse = Mouse(ctx)
const touch = Touch(ctx)
const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

const BlueSphereInBoxWireframe = (ctx) => {
  const box = Box(ctx, {
    wireframe: true,
    color: [0.8, 0.8, 0.8, 1],
  })
  const sphere = Sphere(ctx, {
    radius: 1,
    color: [0.5, 0.5, 1, 1],
    scale: [0.5, 0.5, 0.5],
  })
  return (state, block) => {
    box({...state}, () => {
      sphere()
    })
  }
}

const draw = BlueSphereInBoxWireframe(ctx)

frame(({time}) => {
  orbitCamera({ }, () => {
    draw()
    draw({position: [-2, 0, 0]})
    draw({position: [2, 0, 0]})
    draw({
      position: [0, 2, Math.cos(time)],
      color: [0.8, 0.6, Math.cos(0.5*time), 1]
    })
  })
})
