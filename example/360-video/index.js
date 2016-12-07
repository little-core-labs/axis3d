'use strict'

/**
 * Module dependencies.
 */

import { OrbitCameraController } from 'axis3d/controller'
import { Sphere } from 'axis3d/mesh'
import { Video } from 'axis3d/media'
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
const ctx = Context()

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
raf(() => {

  // play next frame
  video.play()
  video.mute()

  // focus now
  ctx.focus()
  setTimeout(() => orbitController({orientation: [0, 3*Math.PI / 2, 0]}))
})

// expose useful things to window
Object.assign(window, {camera, sphere, video})

// axis animation frame loop
frame(({time}) => {
  // draw camera scene
  camera(() => {
    sphere({scale: [-100, -100, 100]})
    orbitController({
      interpolationFactor: 0.1,
      zoom: {fov: true}
    })
  })
})
