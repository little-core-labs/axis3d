'use strict'

import {
  PerspectiveCamera,
  OrthographicCamera,
  FlatMaterial,
  BoxGeometry,
  Quaternion,
  Texture,
  Context,
  Frame,
  Mesh,
} from '../../src'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = new Context()

const box = new Mesh(ctx, { geometry: new BoxGeometry() })
const video = document.createElement('video')
const frame = new Frame(ctx)
const camera = new OrthographicCamera(ctx, {viewport: [-1, -1, 1, 1]})
//const camera = PerspectiveCamera(ctx, {position: [0, 0, 5]})
const texture = new Texture(ctx)
const material = new FlatMaterial(ctx, {map: texture})
const rotation = new Quaternion()

video.autoplay = true
video.loop = true
video.src = 'assets/video.mp4'

video.load()
video.play()

const multiply = (...args) => quat.multiply([], ...args)
const angle = (...args) => quat.setAxisAngle([], ...args)

frame(({time}) => {
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.05*time)
  const z = angle([0, 0, 1], 0.05*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({position: [0, 0, 5], rotation}, () => {
    texture({data: video})
    material({cull: false}, () => {
      box()
    })
  })
})
