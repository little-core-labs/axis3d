'use strict'

/**
 * Module dependencies.
 */

import { OrbitCameraController } from '../../extras/controller'
import { Sphere } from 'axis3d/mesh'
import { Video } from 'axis3d/media'
import events from 'dom-events'
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
const ctx = Context({}, {regl: {attributes: {antialias: true}}})
ctx.on('error', (e) => console.error(e.stack || e))

// objects
const camera = Camera(ctx, {fov: 75 * Math.PI/180})
const frame = Frame(ctx)
const video = Video(ctx, '/paramotor.mp4')
//const video = Video(ctx, '/artic.mp4')
const sphere = Sphere(ctx, { map: video })

// inputs
const mouse = Mouse(ctx)
const touch = Touch(ctx)
const orientation = Orientation(ctx)
const keyboard = Keyboard(ctx, {
  mapping: {
    up: ['w', 'k'],
    down: ['s', 'j'],
    left: ['a', 'h'],
    right: ['d', 'l']
  }
})

// orbit controller
const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  invert: true,
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

// orient controllers to "center" of video/video
video.once('load', () => {
  raf(() => {
    orbitCamera({
      orientation: [0, 3*Math.PI / 2, 0]
    })
    // focus now
    ctx.focus()
  })
})

// expose useful things to window
Object.assign(window, {camera, sphere, video})

let isPlaying = false
events.on(ctx.domElement, 'click', onclick)
function onclick(e) {
  if (isPlaying) {
    console.log('pause')
    video.pause()
    isPlaying = false
  } else {
    console.log('play')
    video.play()
    isPlaying = true
  }
}
let to = 0
events.on(ctx.domElement, 'touchstart', ontouch)
function ontouch(e) {
  clearTimeout(to)
  e.preventDefault()
  to = setTimeout(() => {
    clearTimeout(to)
    touch(({touches}) => {
      if (!touches) {
        onclick(e)
      }
    })
  }, 350)
}

// render loop
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
