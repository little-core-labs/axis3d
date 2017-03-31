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
} from 'axis3d'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()

const box = Mesh(ctx, { geometry: BoxGeometry(ctx) })
const video = document.createElement('video')
const frame = Frame(ctx)
const camera = OrthographicCamera(ctx, {viewport: [-1, -1, 1, 1]})
//const camera = PerspectiveCamera(ctx, {position: [0, 0, 5]})
const texture = Texture(ctx)
const material = FlatMaterial(ctx, {map: texture})
const rotation = Quaternion()

video.autoplay = true
video.loop = true
video.src = 'video.mp4'

video.load()
video.play()

frame(({time}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
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
