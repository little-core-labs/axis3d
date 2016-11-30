'use strict'

/**
 * Module dependencies.
 */

import VignetteBackground from 'axis3d/backgrounds/vignette'
import Feedback from 'axis3d/feedback'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Sphere from 'axis3d/mesh/sphere'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import Box from 'axis3d/mesh/box'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import raf from 'raf'

const ctx = Context()

const background = VignetteBackground(ctx)
const feedback = Feedback(ctx)
const camera = Camera(ctx)
const sphere = Sphere(ctx, {wireframe: true})
const plane = Plane(ctx, {size:{x: 2, y: 2}})
const frame = Frame(ctx)
const box = Box(ctx, {wireframe: true})

const position = [0, 0, 0]
const rotation = [0, 0, 0, 1]
const scale = [1, 1, 1]
const color = [0, 0, 0, 1]

const rotate = (radians) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const copy = quat.copy
  const x = quat.setAxisAngle([], [1, 0, 0], radians)
  const y = quat.setAxisAngle([], [0, 1, 0], radians)
  const z = quat.setAxisAngle([], [0, 0, 1], radians)
  copy(rotation, multiply(multiply(x, y), z))
}

const translate = (x, y, z) => {
  position[0] = x
  position[1] = y
  position[2] = z
}

Object.assign(window, {
  feedback,
  camera,
  sphere,
  frame,
  box,
  ctx,
})

frame(({time}) => {
  const reduction = 1 - Math.cos(time)
  color[0] = 0.25*time % 128
  color[1] = 0.50*time % 128
  color[2] = Math.sin(0.25*time) % 128
  background({color, reduction})

  camera({
    position: [0, 0, 5],
    rotation: quat.setAxisAngle([], [0, 0, 1], 0.5*time),
  }, () => {
    plane({
      rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*time),
    }, ({model}) => {
      feedback({model,  opacity: 1.0})
      rotate(1 - Math.sin(0.5*time))
      translate(-2, 0, 0)
      scale[0] = Math.cos(time)
      scale[1] = Math.cos(time)
      scale[2] = Math.cos(time)
      sphere({rotation, position, scale}, ({model}) => {
        feedback({model,  opacity: 1.0})
      })

      box({rotation, position})
      rotate(Math.cos(0.5*time))
      translate(+4, 0, 0)
      scale[0] = 0.5*Math.sin(time)
      scale[1] = 0.5*Math.sin(time)
      scale[2] = 0.5*Math.sin(time)

      box({rotation, position, scale}, ({model}) => {
        feedback({model,  opacity: 1.0})
      })

      sphere({rotation, position})
    })
  })
})
