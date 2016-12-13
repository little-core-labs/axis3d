'use strict'

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Sphere,
  Box,
} from 'axis3d/mesh'

import quat from 'gl-quat'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx, {position: [0, 0, 5]})

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
  camera({
    rotation: quat.multiply(
      quat.setAxisAngle([], [1, 0, 0], 0.1*time),
      quat.setAxisAngle([], [0, 1, 0], 0.15*time),
      quat.setAxisAngle([], [0, 0, 1], -0.08*time)
    ),
  }, () => {
    draw()
  })
})
