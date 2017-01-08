'use strict'

import {
  FlatMaterial,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  SphereGeometry
} from 'axis3d/geometry'

import {
  Quaternion
} from 'axis3d/math'

import {
  OrientationInput,
  KeyboardInput,
  TouchInput,
  MouseInput,
} from 'axis3d/input'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()
const video = document.createElement('video')

const texture = Texture(ctx, {data: video})
const material = FlatMaterial(ctx, {map: texture})

const camera = Camera(ctx, {position: [0, 0, 0]})
const sphere = Mesh(ctx, { geometry: SphereGeometry(ctx) })
const frame = Frame(ctx)

// inputs
const orientation = OrientationInput(ctx)
const keyboard = KeyboardInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, {
  camera, inputs,
  interpolationFactor: 0.3,
  rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*Math.PI)
})

// init video
let isVideoPlaying = false
video.src = 'paramotor.mp4'
video.autoload = true
video.load()

video.addEventListener('playing', () => { isVideoPlaying = true })
video.addEventListener('play', () => { isVideoPlaying = true })
video.addEventListener('pause', () => { isVideoPlaying = false })
video.addEventListener('error', () => { isVideoPlaying = false })
video.addEventListener('stop', () => { isVideoPlaying = false })
video.addEventListener('end', () => { isVideoPlaying = false })

ctx.domElement.addEventListener('touchstart', onclick)
ctx.domElement.addEventListener('click', onclick)
function onclick(e) {
  e.preventDefault()
  if (isVideoPlaying) { video.pause() }
  else { video.play() }
}

frame(({time}) => {
  orbitCamera(() => {
    material(() => {
      sphere({scale: [100, -100, 100]})
    })
  })
})
