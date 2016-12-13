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
ctx.on('error', (e) => console.error(e))

// objects
const camera = Camera(ctx, {fov: 75 * Math.PI/180})
const frame = Frame(ctx)
//const video = Video(ctx, '/paramotor.mp4')
const video = Video(ctx, '/artic.mp4')
const sphere = Sphere(ctx, { map: video })

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

// orient controllers to "center" of video/video
const orientation = [0, 3*Math.PI / 2, 0]
video.once('load', () => {
  raf(() => {
    orbitCamera({orientation})
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
