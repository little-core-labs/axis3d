'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  ReflectionMaterial,
  PerspectiveCamera,
  OrientationInput,
  MaterialUniforms,
  SphereGeometry,
  KeyboardInput,
  PlaneGeometry,
  FlatMaterial,
  MeshUniforms,
  TouchInput,
  MouseInput,
  Material,
  Texture,
  Context,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import stanfordBunny from 'bunny'

const ctx = Context()

const frame = Frame(ctx)
const camera = PerspectiveCamera(ctx)

const material = FlatMaterial(ctx)

const texture = Texture(ctx)
const govBall = new Image()
govBall.src = 'assets/govball.jpg'
texture({data: govBall})

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
})

const reflectiveMaterial = ReflectionMaterial(ctx, {
  envmap: texture,
})

const bunny = Mesh(ctx, {
  geometry: stanfordBunny,
  reflective: true,
})

const bgMaterial = FlatMaterial(ctx, {
  map: texture
})

const background = Mesh(ctx, {
  geometry: SphereGeometry(ctx)
})

frame(() => {
  orbitCamera({position: [-0.2,0,0], target: [0,0,0]}, () => {
    bgMaterial({cull: false}, () => {
      background({scale: [1, -1, 1] }, () => {
        reflectiveMaterial({} , () => {
          bunny({scale: 0.1, position: [0, -0.02, 0]})
        })
      })
    })
  })
})