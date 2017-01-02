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
  PlaneGeometry
} from 'axis3d/geometry'

import quat from 'gl-quat'
import clamp from 'clamp'

// fullscreen canvas
const ctx = Context()

// video dom element
const video = document.createElement('video')

const material = Material(ctx, { map: Texture(ctx, {data: video}) })
const camera = Camera(ctx, {position: [0, 0, 5]})
const frame = Frame(ctx)
const plane = Mesh(ctx, { geometry: PlaneGeometry(ctx) })

video.autoplay = true
video.loop = true
video.src = 'paramotor.mp4'

video.load()
video.play()

frame(({time, viewportWidth, viewportHeight}) => {
  const aspectRatio = viewportWidth/viewportHeight || 1

  let height = 0
  let width = 0
  let dist = 0
  let fov = 0

  plane({draw: false}, ({size, position: planePosition}) => {
    height = size.y || 1
    width = size.x || 1
    camera(({position: cameraPosition}) => {
      dist = cameraPosition.z - planePosition.z
      fov = 2.0*Math.atan((width/aspectRatio) / (2.0*dist))
    })
  })

  camera({fov}, () => {
    material(() => {
      let ph = height, pw = width
      let wh = viewportHeight, ww = viewportWidth
      let vh = video.height, vw = video.width
      let vr = vw/vh
      let wr = ww/wh
      let x = ww <= vw ? 1 : clamp(ww/vw, 0, 1)
      let y = wh <= vh ? 1 : clamp(wh/vh, 0, 1)/vr

      if (vr != x/y) {
        if (ww/wh > 2) {
          x = (wh * vr)/ww
          y = wh/ww
        } else if (ww/wh < 2) {
          y = x/vr
        }
      }

      x = x || 1
      y = y || 1

      plane({scale: [x, -y, 1]})
    })
  })
})
