'use strict'

import {
  Material,
  Texture,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  Quaternion
} from 'axis3d/math'

import {
  BoxGeometry
} from 'axis3d/geometry'

import quat from 'gl-quat'

// fullscreen canvas
const ctx = Context()

const box = Mesh(ctx, { geometry: BoxGeometry(ctx) })
const video = document.createElement('video')
const frame = Frame(ctx)
const camera = Camera(ctx, {position: [0, 0, 5]})
const material = Material(ctx, { map: Texture(ctx, {data: video}) })
const rotation = new Quaternion()

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
  camera({rotation}, () => {
    material(() => {
      box()
    })
  })
})
