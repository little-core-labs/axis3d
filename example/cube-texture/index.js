'use strict'

import {
  PerspectiveCamera,
  SphereGeometry,
  BoxGeometry,
  CubeTexture,
  Quaternion,
  Material,
  Context,
  Frame,
  Color,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()

const camera = PerspectiveCamera(ctx)
const sphere = Mesh(ctx, { geometry: SphereGeometry() })
const box = Mesh(ctx, { geometry: BoxGeometry() })
const frame = Frame(ctx)

const cubeTexture = CubeTexture(ctx)

const material = Material(ctx, {
  map: cubeTexture,
  fragmentShaderMain:
  ///////// FRAGMENT SHADER //////////
    `
    varying float v_color;
    void main() {
      GeometryContext geometry = getGeometryContext();

      gl_FragColor = textureCube( map.data, geometry.position );
    }`
})
const rotation = Quaternion()

const squareSize = 320

const image01 = new Image()
const image2 = new Image()
const image3 = new Image()
const image4 = new Image()
const image5 = new Image()
const image6 = new Image()
image01.src = 'assets/smsq1.jpg'
image2.src = 'assets/smsq2.jpg'
image3.src = 'assets/smsq1.jpg'
image4.src = 'assets/smsq2.jpg'
image5.src = 'assets/smsq1.jpg'
image6.src = 'assets/smsq2.jpg'

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

cubeTexture([
  canvas,
  canvas,
  video,
  video,
  image2,
  image3,
])

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  camera({rotation, position: [0, 0, 2]}, () => {
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
