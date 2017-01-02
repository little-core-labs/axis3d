'use strict'

import { OrbitCameraController } from '../../extras/controller'
import quat from 'gl-quat'

import {
  Material,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  SphereGeometry,
  BoxGeometry,
} from 'axis3d/geometry'

import {
  OrientationInput,
  TouchInput,
  MouseInput,
} from 'axis3d/input'

const ctx = Context()

const camera = Camera(ctx, {position: [0, 0, 5]})
const frame = Frame(ctx)

// inputs
const orientation =  OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

const BlueSphereInBoxWireframe = (ctx) => {
  const material = Material(ctx)
  const sphere = Mesh(ctx, { geometry: SphereGeometry({radius: 1}) })
  const box = Mesh(ctx, { geometry: BoxGeometry() })
  return (state, block) => {
    material({ color: [0.8, 0.8, 0.8, 1], ...state }, () => {
      box({ ...state, wireframe: true }, () => {
        material({ color: [0.2, 0.2, 0.8, 1] }, () => {
          sphere({ scale: [0.5, 0.5, 0.5] })
        })
      })
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
