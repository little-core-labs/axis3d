'use strict'

/**
 * Module dependencies.
 */

import Keyboard from 'axis3d/input/keyboard'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import events from 'dom-events'
import Plane from 'axis3d/mesh/plane'
import Video from 'axis3d/media/video'
import Frame from 'axis3d/frame'
import Mouse from 'axis3d/input/mouse'
import clamp from 'clamp'
import raf from 'raf'

// axis context
//const ctx = Context({}, {regl: {attributes: {antialias: true}}})
const ctx = Context()

// objects
const camera = Camera(ctx)
const frame = Frame(ctx)
const video = Video(ctx, '/paramotor.mp4')
const plane = Plane(ctx, {map: video})

Object.assign(window, {
  ctx, camera, frame, video, plane
})

raf(() => {
  ctx.focus()
})

let isPlaying = false
events.on(ctx.domElement, 'click', ontouch)
events.on(ctx.domElement, 'touch', ontouch)
function ontouch() {
  if (isPlaying) {
    video.pause()
    isPlaying = false
  } else {
    video.play()
    isPlaying = true
  }
}

// axis animation frame loop
frame(({viewportWidth, viewportHeight}) => {
  const aspectRatio = viewportWidth/viewportHeight || 1
  const height = plane.size.y || 1
  const width = plane.size.x || 1
  const dist = camera.position.z - plane.position.z
  const fov = 2.0*Math.atan((width/aspectRatio) / (2.0*dist))
  // draw camera scene
  camera({fov, position: [0, 0, 1]}, () => {
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

    plane({scale: [x, y, 1]})
  })
})
