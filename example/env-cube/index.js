'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  KeyboardInput,
  FlatMaterial,
  BoxGeometry,
  CubeTexture,
  TouchInput,
  Texture,
  MouseInput,
  Quaternion,
  Material,
  SphereGeometry,
  Object3D,
  Context,
  Frame,
  Mesh,
} from '../../src'

import quat from 'gl-quat'
const ctx = new Context()
const sphere = new Mesh(ctx, { geometry: new SphereGeometry() })

const camera = new PerspectiveCamera(ctx)
const box = new Mesh(ctx, { geometry: new BoxGeometry() })
const frame = new Frame(ctx)
const cubeTexture = new CubeTexture(ctx)
const envTexture = new Texture(ctx)
const envCubeTexture = new CubeTexture(ctx)
const envMaterial = new FlatMaterial(ctx, {envmap: envTexture})
// const envMaterial = new FlatMaterial(ctx, {map: envCubeTexture})
// const envMaterial = new FlatMaterial(ctx, {map: envTexture})
const boxMaterial = new FlatMaterial(ctx, {map: cubeTexture})
const rotation = new Quaternion()

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
})

///// Center Cube Texture /////
// all cube textures should be same size and a power of 2
const squareSize = 256

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
  video,
  image1,
  canvas,
  video,
  image2,
  canvas,
]})

///// Environment Cube Texture /////
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

envCubeTexture({data: [
  ft,
  bk,
  up,
  dn,
  rt,
  lf,
]})

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  orbitCamera({ rotation, position: [-0.25, 0, 0], target: [0, 0, 0] }, () => {
    boxMaterial({cull: false}, () => {
      box({scale: [0.31,0.31,0.31]})
    })
    // envCubeTexture({data: bk})
    envTexture({data: bk})
    envMaterial({cull: false}, () => {
      sphere({})
      // box({size: [0.81,0.81,0.81]})
    })
  })
})
