'use strict'

/**
 * Module dependencies.
 */

import { OrbitCameraController } from 'axis3d/controller'
import { Sphere } from 'axis3d/mesh'
import { Image } from 'axis3d/media'
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
const image = Image(ctx, '/govball.jpg')
const sphere = Sphere(ctx, { envmap: image })

Object.assign(window, {ctx, camera, frame, image, sphere})

// inputs
const keyboard = Keyboard(ctx)
const mouse = Mouse(ctx)

// orbit controller
const orbitController = OrbitCameraController(ctx, {
  inputs: {mouse, keyboard},
  target: camera,
  invert: true,
})

// orient controllers to "center" of image/video
image.once('load', () => {
  raf(() => {
    orbitController({orientation: [0, Math.PI / 4, 0]})
    // focus now
    ctx.focus()
  })
})

// axis animation frame loop
frame(() => {
  // draw camera scene
  camera(() => {
    sphere({scale: [-100, -100, 100]})
    orbitController({
      interpolationFactor: 0.1,
      sloppy: true,
      zoom: {fov: true}
    })
  })
})
