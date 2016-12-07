'use strict'

/**
 * Module dependencies.
 */

import { OrbitCameraController } from 'axis3d/controller'
import { Sphere } from 'axis3d/mesh'
import { Video } from 'axis3d/media'
import events from 'dom-events'
import raf from 'raf'

import {
  Keyboard,
  Mouse,
} from 'axis3d/input'

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

// axis context
//const ctx = Context()
const ctx = Context({}, {regl: {attributes: {antialias: true}}})

// objects
const camera = Camera(ctx)
const frame = Frame(ctx)
const video = Video(ctx, '/paramotor.mp4')
const sphere = Sphere(ctx, { envmap: video })

// inputs
const keyboard = Keyboard(ctx)
const mouse = Mouse(ctx)

// orbit controller
const orbitController = OrbitCameraController(ctx, {
  inputs: {mouse, keyboard},
  target: camera,
  invert: true,
})

// orient controllers to "center" of video/video
const orientation = [0, 3*Math.PI / 2, 0]
raf(() => {

  // play next frame
  video.mute()

  // focus now
  ctx.focus()
  setTimeout(() => orbitController({orientation}))
})

// expose useful things to window
Object.assign(window, {camera, sphere, video})

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

// controller loop
frame(({time}) => {
  // draw camera scene
    orbitController({
      //orientation,
      interpolationFactor: 0.1,
      zoom: {fov: true}
    })
})

// render loop
frame(({time}) => {
  // draw camera scene
  camera(() => {
    sphere({scale: [-100, -100, 100]})
  })
})
