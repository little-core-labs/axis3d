'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  MaterialUniforms,
  DirectionalLight,
  SphereGeometry,
  PhongMaterial,
  KeyboardInput,
  PlaneGeometry,
  AmbientLight,
  FlatMaterial,
  MeshUniforms,
  BoxGeometry,
  CubeTexture,
  TouchInput,
  MouseInput,
  Material,
  Geometry,
  Context,
  Texture,
  Frame,
  Mesh,
} from '../../src'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import stanfordBunny from 'bunny'

const ctx = new Context()

const frame = new Frame(ctx)
const camera = new PerspectiveCamera(ctx)

const texture = new Texture(ctx)
const abstractImg = new Image()
abstractImg.src = 'assets/smsq2.jpg'
abstractImg.onload = () => texture({data: abstractImg})

const cubeTexture = new CubeTexture(ctx)
const bk = new Image()
bk.src = 'assets/criminal-impact_bk.jpg'
const dn = new Image()
dn.src = 'assets/criminal-impact_dn.jpg'
const ft = new Image()
ft.src = 'assets/criminal-impact_ft.jpg'
const lf = new Image()
lf.src = 'assets/criminal-impact_lf.jpg'
const rt = new Image()
rt.src = 'assets/criminal-impact_rt.jpg'
const up = new Image()
up.src = 'assets/criminal-impact_up.jpg'

cubeTexture({data: [
  ft,
  bk,
  up,
  dn,
  rt,
  lf,
]})

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
})

const directional = new DirectionalLight(ctx)
const ambient = new AmbientLight(ctx)

const reflectiveMaterial = new PhongMaterial(ctx, {
  envmap: cubeTexture,
  map: texture,
  color: [1.0, 1.0, 1.0, 1.0]
})

const bunny = new Mesh(ctx, {
  geometry: new BoxGeometry(),
})

const backgroundMaterial = new FlatMaterial(ctx, {
  envmap: cubeTexture
})

const background = new Mesh(ctx, {
  geometry: new BoxGeometry()
})

frame(() => {
  orbitCamera({position: [-0.2, 0, 0], target: [0, 0, 0]}, () => {

    directional({
      color: [1.0, 1.0, 1.0, 1.0],
      position: [0, 1, -5],
    })
    ambient({
      color: [1.0, 1.0, 1.0, 1.0],
      ambient: 1.1
    })

    backgroundMaterial({cull: false}, () => {
      background({scale: [1, -1, 1]})
    })

    reflectiveMaterial({
      cull: false,
      shininess: 180,
      specular: [1.0, 0.790, 0.990, 1.0],
      emissive: [0.0, 0.0, 0.0, 1.0],
    }, () => {
      bunny({
        scale: 0.311,
        position: [0, -0.0, 0]
      })
    })
  })
})
