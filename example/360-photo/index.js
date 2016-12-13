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
//const ctx = Context()
const ctx = Context({}, {gl: {attributes: {antialias: true}}})

// objects
const camera = Camera(ctx, {fov: Math.PI/2.5})
const frame = Frame(ctx)
const image = Image(ctx, '/govball.jpg')
const sphere = Sphere(ctx, { map: image })

Object.assign(window, {ctx, camera, frame, image, sphere})

// inputs
const keyboard = Keyboard(ctx)
const mouse = Mouse(ctx)
const touch = Touch(ctx)

// orbit controller
const orbitCamera = OrbitCameraController(ctx, {
  inputs: {mouse, touch, keyboard},
  invert: true,
  camera,
})

// orient controllers to "center" of image/video
image.once('load', () => {
  raf(() => {
    orbitCamera({orientation: [0, Math.PI / 4, 0]})
    // focus now
    ctx.focus()
  })
})

// axis animation frame loop
frame(() => {
  // draw camera scene
  touch(({touches}) => {
    orbitCamera({
      interpolationFactor: touches ? 0.5 : 0.2,
      friction: touches ? 2 : 0.3,
      sloppy: true,
      zoom: {fov: true}
    }, () => {
      sphere({scale: [-100, -100, 100]})
    })
  })
})
