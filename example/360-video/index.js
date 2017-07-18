'use strict'

import {
  PerspectiveCamera,
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

import { OrbitCameraController } from '../../extras/controller'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = new Context({regl: {attributes: {antialias: true}}})
const video = document.createElement('video')

const texture = new Texture(ctx)
const material = new FlatMaterial(ctx, {map: texture})

const camera = new PerspectiveCamera(ctx, {position: [0, 0, 0]})
const sphere = new Mesh(ctx, { geometry: new SphereGeometry()})
const frame = new Frame(ctx)

// inputs
const keyboard = new KeyboardInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)

const inputs = { keyboard, touch, mouse }
const orbitCamera = new OrbitCameraController(ctx, {
  camera,
  inputs,
  interpolationFactor: 0.1,
  maxEuler: [0.5*Math.PI, Infinity],
  minEuler: [-0.5*Math.PI, -Infinity],
  rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*Math.PI),
})

// init video
let isVideoPlaying = false
video.src = 'assets/paramotor.mp4'
video.preload = 'metadata'
video.autoload = true
video.load()

video.addEventListener('playing', () => { isVideoPlaying = true })
video.addEventListener('play', () => { isVideoPlaying = true })
video.addEventListener('pause', () => { isVideoPlaying = false })
video.addEventListener('error', () => { isVideoPlaying = false })
video.addEventListener('stop', () => { isVideoPlaying = false })
video.addEventListener('end', () => { isVideoPlaying = false })

video.addEventListener('timeupate', () => console.log(video.currentTime))

window.video = video
ctx.domElement.addEventListener('touchstart', onclick)
ctx.domElement.addEventListener('click', onclick)
function onclick(e) {
  e.preventDefault()
  if (isVideoPlaying) { video.pause() }
  else { video.play() }
}

frame(({time}) => {
  orbitCamera(() => {
    texture({data: video})
    material({cull: false}, () => {
      sphere({scale: [-1, 1, 1] })
    })
  })
})
