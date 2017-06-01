'use strict'

import {
  PerspectiveCamera,
  FlatMaterial,
  BoxGeometry,
  CubeTexture,
  Quaternion,
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
const group = Object3D(ctx)

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

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  camera({rotation, position: [0, 0, 3]}, () => {
    const angle = (...args) => quat.setAxisAngle([], ...args)
    const x = angle([1, 0, 0], 0.35*time)
    const y = angle([0, 1, 0], 0.38*time)
    const z = angle([0, 0, 1], -0.20*time)
    quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
    material({}, () => {
      box({})
    })
  })
})
