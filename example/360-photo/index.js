'use strict'

import {
  Material,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  SphereGeometry
} from 'axis3d/geometry'

import {
  Quaternion
} from 'axis3d/math'

import {
  OrientationInput,
  KeyboardInput,
  TouchInput,
  MouseInput,
} from 'axis3d/input'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()
const image = new Image(); image.src = 'govball.jpg'

const texture = Texture(ctx, {data: image})
const material = Material(ctx, {map: texture})

const camera = Camera(ctx, {position: [0, 0, 0]})
const sphere = Mesh(ctx, { geometry: SphereGeometry(ctx) })
const frame = Frame(ctx)

// inputs
const orientation = OrientationInput(ctx)
const keyboard = KeyboardInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, {
  camera, inputs,
  interpolationFactor: 0.1,
  rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*Math.PI)
})

frame(({time}) => {
  orbitCamera(() => {
    material(() => {
      sphere({scale: [100, -100, 100]})
    })
  })
})
