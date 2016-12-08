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
  Touch,
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
const camera = Camera(ctx, {fov: Math.PI/2.5})
const frame = Frame(ctx)
const image = Image(ctx, '/govball.jpg')
const sphere = Sphere(ctx, { envmap: image })

Object.assign(window, {ctx, camera, frame, image, sphere})

// inputs
const keyboard = Keyboard(ctx)
const mouse = Mouse(ctx)
const touch = Touch(ctx)

// orbit controller
const orbitController = OrbitCameraController(ctx, {
  inputs: {mouse, touch, keyboard},
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

frame(() => {
  touch(({touches}) => {
    orbitController({
      interpolationFactor: touches ? 1 : 0.07,
      friction: 0.7,
      sloppy: true,
      zoom: {fov: true}
    })
  })
})

// axis animation frame loop
frame(() => {
  // draw camera scene
  camera(() => {
    sphere({scale: [-100, -100, 100]})
  })
})
