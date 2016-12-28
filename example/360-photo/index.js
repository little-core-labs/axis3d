'use strict'

/**
 * Module dependencies.
 */

import { OrbitCameraController } from '../../extras/controller'
import { Sphere } from 'axis3d/mesh'
import { Image } from 'axis3d/media'
import quat from 'gl-quat'
import raf from 'raf'

import {
  Orientation,
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
const frame = Frame(ctx)
const image = Image(ctx, '/govball.jpg')
const sphere = Sphere(ctx, { map: image })
const camera = Camera(ctx, {fov: Math.PI/2.5})

Object.assign(window, {ctx, camera, frame, image, sphere})

// inputs
const orientation =  Orientation(ctx, {invertAlphaAngle: true})
const mouse = Mouse(ctx)
const touch = Touch(ctx)
const keyboard = Keyboard(ctx, {
  // enable 'wasd' and vim 'hjkl' control
  mapping: {
    up: ['w', 'k'],
    down: ['s', 'j'],
    left: ['a', 'h'],
    right: ['d', 'l']
  }
})

// orbit controller
const orbitCamera = OrbitCameraController(ctx, {
  invert: true,
  camera: camera,
  rotation: {
    y: quat.setAxisAngle([], [0, 1, 0], 0.5*Math.PI),
  },
  inputs: {
    orientation,
    keyboard,
    touch,
    mouse,
  },
})

// orient controllers to "center" of image/video
image.once('load', () => {
  raf(() => {
    // focus now
    ctx.focus()
  })
})

// axis animation frame loop
frame(() => {
  // draw camera scene
  touch(({touches}) => mouse(({buttons}) => keyboard(({mappings}) => {
    const hasInteraction = Boolean(
      touches ||
      buttons ||
      ['up', 'down', 'left', 'right'].some((x) => mappings.value(x))
    )

    orbitCamera({
      interpolationFactor: hasInteraction ? 0.25 : 0.1,
      zoom: {fov: true}
    }, () => {
      sphere({scale: [100, 100, 100]})
    })
  })))
})
