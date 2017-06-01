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
  BoxGeometry,
  CubeTexture,
  TouchInput,
  MouseInput,
  Quaternion,
  Material,
  Object3D,
  Context,
  Frame,
  Color,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()

const camera = PerspectiveCamera(ctx)
const box = Mesh(ctx, { geometry: BoxGeometry() })
const frame = Frame(ctx)
const cubeTexture = CubeTexture(ctx)
const material = FlatMaterial(ctx, {envmap: cubeTexture})
const rotation = Quaternion()
const sphere = Mesh(ctx, { geometry: SphereGeometry() })

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
  euler: [0, 0.5*Math.PI, 1]
})

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
const cadence = squareSize/20
for (let i = 0; i < squareSize; i+=cadence) {
  let red = (150+(i-15))%255
  let green = i%255
  let blue = (i-35)%255
  canvasCtx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + i + ')'
  canvasCtx.fillRect(i, blue, red, green)
}
canvasCtx.globalCompositeOperation = 'destination-over';
canvasCtx.fillStyle = 'rgba(195,190,113,1)'
canvasCtx.fillRect(0,0,squareSize, squareSize)

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

const sphereMaterial = Material(ctx, {
  color: Color('cyan'),
})

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  orbitCamera({ position: [0, -0.25, 0], target: [0, -0.25, 0] }, () => {
    sphereMaterial({cull: false}, () => {
      sphere({scale: [0.31,0.31,0.31]})
    })
    material({cull: false}, () => {
      box({size: [0.81,0.81,0.81]})
    })
  })
})
