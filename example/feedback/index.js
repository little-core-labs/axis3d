'use strict'

/**
 * Module dependencies.
 */

import OrbitCameraController from 'axis3d/controls/orbit-camera'
import VignetteBackground from 'axis3d/backgrounds/vignette'
import AmbientLight from 'axis3d/light/ambient'
import Feedback from 'axis3d/feedback'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Sphere from 'axis3d/mesh/sphere'
import Mouse from 'axis3d/input/mouse'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import raf from 'raf'
import Box from 'axis3d/mesh/box'

const ctx = Context()

const background = VignetteBackground(ctx)
const feedback = Feedback(ctx)
const camera = Camera(ctx, {position: [1600, 1600, 1600]})
const world = Sphere(ctx, {
  wireframe: true,
  color: [0.8, 0.8, 0.85, .5],
  radius: 500,
})

const sphere = Sphere(ctx)
const light = AmbientLight(ctx)
const plane = Plane(ctx, {
  wireframe: true,
  segments: {x: 64, y: 64},
  color: [0.8, 0.8, 0.8, 1],
  size: {x: 300, y: 300},

  rotation: quat.multiply(
    [],
    quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
    quat.setAxisAngle([], [0, 1, 0], Math.PI)
  ),
})

const frame = Frame(ctx)
const mouse = Mouse(ctx)
const box = Box(ctx, {position: [4, .5, 0]})
const controller = OrbitCameraController(ctx, {
  orientation: [Math.PI/8, -0.3, 0],
  inputs: {mouse},
  target: camera,
})

const position = [0, 0, 0]
const rotation = [0, 0, 0, 1]
const scale = [1, 1, 1]
const color = [0, 0, 0, 1]

const translate = (x, y, z) => {
  position[0] = x
  position[1] = y
  position[2] = z
}

Object.assign(window, {
  controller,
  feedback,
  camera,
  sphere,
  world,
  plane,
  frame,
  vec3,
  box,
  ctx,
})

// swap targets every 10s
window.target = sphere.position
let i = 0
setInterval(() => {
  target = i++ % 2 ? sphere.position : box.position
}, 10000)

frame(({time}) => {
  // vignette background effect
  const reduction = 2 - (0.5 + 0.5*Math.cos(time))
  color[0] = 0.025*time % 128
  color[1] = 0.025*time % 128
  color[2] = Math.sin(0.25*time) % 255
  background({reduction, color})

  // lerp into scene
  if (!mouse.wheel.deltaY) {
    vec3.lerp(camera.position, camera.position, [0, 0, 200], 0.0125)
  }

  // viewer
  const off = 20
  const d = 40
  let s = 0

  // lerp to target
  camera({target: vec3.lerp([], camera.target, target, 0.025)}, () => {
    // update controller state
    controller()

    // draw world
    world({rotation: quat.setAxisAngle([], [1, 0, 0], 0.05*time)}, ({model}) => {
      feedback({model})

      // draw plane in world
      plane()

      // orbit box around origin
      s = 2 + (0.5 - 0.5*Math.cos(time))
      translate(s + 300, s + 0.5, s + 10)
      vec3.transformQuat(
        position, position,
        quat.multiply(
          quat.setAxisAngle([], [1, 0, 0], 0.5*time),
          quat.setAxisAngle([], [0, 1, 0], 0.5*time),
          quat.setAxisAngle([], [0, 0, 1], 0.5*time))
      )

      // draw box with feedback
      s = off + (1.0 - 1.0*Math.cos(time))
      box({position}, ({model}) => {
        feedback({model, scale: [s, s, s]})
      })

      // oscillate sphere
      translate(s + (d - d*Math.sin(time)), s + (0.5 - 0.5*Math.cos(time)), 0)
      s = off + (0.5 - 0.5*Math.cos(time))
      // draw sphere with feedback
      sphere({position, color: [.5, .5, .25, 1]}, ({model}) => {
        feedback({model, scale: [s, s, s]})
      })
    })
  })
})
