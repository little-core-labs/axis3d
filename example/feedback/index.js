'use strict'

/**
 * Module dependencies.
 */

import Feedback from 'axis3d/feedback'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Sphere from 'axis3d/mesh/sphere'
import Mouse from 'axis3d/input/mouse'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import Box from 'axis3d/mesh/box'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import raf from 'raf'

const ctx = Context()

const feedback = Feedback(ctx)
const camera = Camera(ctx)
const sphere = Sphere(ctx)
const frame = Frame(ctx)
const mouse = Mouse(ctx)
const box = Box(ctx)

Object.assign(window, {
  feedback,
  camera,
  sphere,
  frame,
  mouse,
  box,
  ctx,
})

frame(({time}) => {
  camera({
    rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*time),
    position: [0, 0, 5],
  }, () => {

    sphere({
      //wireframe: true,
      rotation: quat.setAxisAngle([], [1, 0, 0], Math.sin(0.5*time)),
      position: [-2, 0, 0],
      color: [0.1, 0.5, 0.66, 0.9],
    }, ({model}) => {
      feedback({model,  opacity: 1.0})
    })

    box({
      rotation: quat.setAxisAngle([], [0, 0, 1], Math.cos(0.5*time)),
      position: [+2, 0, 0],
      //opacity: 0.9,
      color: [0.4, 0.25, 0.36, 1.0],
    }, ({model}) => {
    })
  })
})
