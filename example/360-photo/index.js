'use strict'

/**
 * Module dependencies.
 */

import OrbitCameraController from 'axis3d/controls/orbit-camera'
import Keyboard from 'axis3d/input/keyboard'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Sphere from 'axis3d/mesh/sphere'
import Mouse from 'axis3d/input/mouse'
import Image from 'axis3d/media/image'
import Frame from 'axis3d/frame'
import raf from 'raf'

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
    orbitController.orientation.y = Math.PI / 4
    // focus now
    ctx.focus()
  })
})

// axis animation frame loop
frame(() => {
  // draw camera scene
  camera(() => {
    orbitController({sloppy: true, interpolationFactor: 0.1, zoom: {fov: true}})
    sphere({scale: [100, 100, 100]})
  })
})
