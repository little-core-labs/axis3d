'use strict'

/**
 * Module dependencies.
 */

import Keyboard from 'axis3d/input/keyboard'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Video from 'axis3d/media/video'
import Frame from 'axis3d/frame'
import Mouse from 'axis3d/input/mouse'
import clamp from 'clamp'
import raf from 'raf'

// axis context
const ctx = Context({}, {regl: {attributes: {antialias: true}}})

// objects
const camera = Camera(ctx)
const frame = Frame(ctx)
const video = Video(ctx, '/paramotor.mp4')
const plane = Plane(ctx, {map: video})

Object.assign(window, {
  ctx, camera, frame, video, plane
})

camera.position.z = 1

//raf(() => video.play())

// axis animation frame loop
frame(({time, viewportWidth, viewportHeight}) => {
  const aspectRatio = viewportWidth/viewportHeight
  const height = plane.size.y
  const width = plane.size.x
  const dist = camera.position.z - plane.position.z
  const fov = 2.0*Math.atan((width/aspectRatio) / (2.0*dist))
  // draw camera scene
  camera({fov}, () => {
    let min = Math.min, max = Math.max
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

    plane.scale.set(x, y, 1)
    plane()
  })
})
