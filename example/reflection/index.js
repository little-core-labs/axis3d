'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  CylinderGeometry,
  CapsuleGeometry,
  PerspectiveCamera,
  OrientationInput,
  MaterialUniforms,
  DirectionalLight,
  SphereGeometry,
  AmbientLight,
  PhongMaterial,
  KeyboardInput,
  PlaneGeometry,
  FlatMaterial,
  MeshUniforms,
  CubeTexture,
  TouchInput,
  MouseInput,
  Material,
  Texture,
  BoxGeometry,
  Geometry,
  Context,
  Frame,
  Mesh,
} from '../../src'

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
govBall.onload = () => texture({data: govBall})
texture({data: govBall})

const cubeTexture = CubeTexture(ctx)
// all cube textures sources must be square and same size
const squareSize = 320

const image1 = new Image()
const image2 = new Image()
image1.src = 'assets/smsq1.jpg'
image2.src = 'assets/smsq2.jpg'

const canvas = document.createElement('canvas')
canvas.style.backgroundColor = 'rgb(100,30,50)'
canvas.width = squareSize
canvas.height = squareSize
const canvasCtx = canvas.getContext('2d')
canvasCtx.fillStyle = 'rgb(20,110,100)'
// // const cadence = squareSize/20
// // for (let i = 0; i < squareSize; i+=cadence) {
// //   canvasCtx.fillRect(i, i, i, i)
// // }
// canvasCtx
canvasCtx.font = '572px serif'
canvasCtx.fillText('2', 10, 300)

const video = document.createElement('video')
video.autoplay = true
video.loop = true
video.src = 'assets/squarevid.mp4'
video.load()
video.play()

cubeTexture({data: [
  image1,
  image2,
  // canvas,
  // canvas,
  canvas,
  canvas,
  canvas,
  canvas,
  // video,
  // video,
]})

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

const directional = DirectionalLight(ctx)
const ambient = AmbientLight(ctx)

const reflectiveMaterial = PhongMaterial(ctx, {
  envmap: cubeTexture,
  color: [1.0,1.0,1.0,1.0]
})

const bunny = Mesh(ctx, {
  geometry: CapsuleGeometry()
})

const backgroundMaterial = FlatMaterial(ctx, {
  envmap: cubeTexture
})

const background = Mesh(ctx, {
  geometry: BoxGeometry()
})

frame(() => {
  orbitCamera({position: [0,0,0], target: [0,0,0]}, () => {

    directional({
      color: [1.0,1.0,1.0,1.0],
      position: [0, 1, -5],
    })
    ambient({
      color: [1.0,1.0,1.0,1.0],
      ambient: 1.1
    })

    backgroundMaterial({cull: false}, () => {
      background({scale: [1, -1, 1]})
    })

    reflectiveMaterial({
      cull: false,
      shininess: 180,
      specular: [1.0,0.790,0.990,1.0],
      emissive: [0.0,0.0,0.0,1.0],
    }, () => {
      bunny({
        scale: 0.21,
        position: [0, 0, 0]
      })
    })
  })
})