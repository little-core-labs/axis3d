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
} from '../../src'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = new Context({
  regl: {
    profile: true,
    extensions: ['EXT_disjoint_timer_query']
  }
})

// scene
const camera = new PerspectiveCamera(ctx)
const sphere = new Mesh(ctx, { geometry: new SphereGeometry()})
const frame = new Frame(ctx)

// surface
const texture = new Texture(ctx)
const material = new FlatMaterial(ctx, {map: texture})

// texture image
const image = new Image()
image.src = 'assets/govball.jpg'
image.onload = () => texture({data: image})

// inputs
const orientation = new OrientationInput(ctx)
const keyboard = new KeyboardInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)

// orbit camera controls
const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = new OrbitCameraController(ctx, {
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
