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
  FlatMaterial,
  MeshUniforms,
  CubeTexture,
  TouchInput,
  MouseInput,
  Material,
  Texture,
  BoxGeometry,
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
canvas.width = squareSize
canvas.height = squareSize
const canvasCtx = canvas.getContext('2d')
canvasCtx.fillStyle = 'rgb(20,110,100)'
const cadence = squareSize/20
for (let i = 0; i < squareSize; i+=cadence) {
  canvasCtx.fillRect(i, i, i, i)
}

const video = document.createElement('video')
video.autoplay = true
video.loop = true
video.src = 'assets/squarevid.mp4'
video.load()
video.play()

cubeTexture({data: [
  image1,
  image2,
  canvas,
  canvas,
  video,
  video,
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

const reflectiveMaterial = PhongMaterial(ctx, {
  envmap: texture,
  // cube: true,
  reflective: true,
  // color: [0.920,0.50,0.70,1.0],
})

const bunny = Mesh(ctx, {
  geometry: BoxGeometry(ctx),
  reflective: true,
})

const bgMaterial = FlatMaterial(ctx, {
  map: texture,
})

const background = Mesh(ctx, {
  geometry: SphereGeometry(ctx)
})

frame(() => {
  orbitCamera({position: [-0.2,0,0], target: [0,0,0]}, () => {

    directional({
      color: [1.0,1.0,1.0,1.0],
      position: [0, 1, -5],
    })

    bgMaterial({cull: false}, () => {
      background({scale: [1, -1, 1] }, () => {
        reflectiveMaterial({
          cull: false,
          shininess: 180,
          specular: [1.0,0.790,0.990,1.0],
          emissive: [0.0,0.0,0.0,1.0],
        } , () => {
          bunny({scale: 0.21, position: [0, -0.02, 0]})
        })
      })
    })
  })
})