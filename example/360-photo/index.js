'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  OrientationInput,
  SphereGeometry,
  KeyboardInput,
  FlatMaterial,
  TouchInput,
  MouseInput,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()

// scene
const camera = Camera(ctx, {position: [0, 0, 0]})
const sphere = Mesh(ctx, { geometry: SphereGeometry(ctx), scale: [1, -1, 1] })
const frame = Frame(ctx)

// surface
const texture = Texture(ctx)
const material = FlatMaterial(ctx, {map: texture})

// texture image
const image = new Image();
image.src = 'govball.jpg'
image.onload = () => texture({data: image})

// inputs
const orientation = OrientationInput(ctx)
const keyboard = KeyboardInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

// orbit camera controls
const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, {
  camera, inputs,
  interpolationFactor: 0.5,
  euler: [0, 0.5*Math.PI, 0]
})

// render loop
frame(({time}) => {
  orbitCamera(() => {
    material(() => {
      sphere()
    })
  })
})
