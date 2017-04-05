'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  SphereGeometry,
  KeyboardInput,
  FlatMaterial,
  TouchInput,
  MouseInput,
  Texture,
  Context,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context({
  regl: {
    profile: true,
    extensions: ['EXT_disjoint_timer_query']
  }
})

// scene
const camera = PerspectiveCamera(ctx)
const sphere = Mesh(ctx, { geometry: SphereGeometry(ctx)})
const frame = Frame(ctx)

// surface
const texture = Texture(ctx)
const material = FlatMaterial(ctx, {map: texture})

// texture image
const image = new Image()
image.src = 'assets/govball.jpg'
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
  invert: true,
  interpolationFactor: 0.1,
  euler: [0, 0.5*Math.PI, 0]
})

// render loop
frame(({time}) => {
  orbitCamera(() => {
    material({cull: false}, () => {
      sphere({scale: [1, -1, 1] })
    })
  })
})
