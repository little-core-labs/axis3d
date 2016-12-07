'use strict'

/**
 * Module dependencies.
 */

import OrbitCameraController from 'axis3d/controller/orbit-camera'
import VignetteBackground from 'axis3d/backgrounds/vignette'
import AmbientLight from 'axis3d/light/ambient'
import Feedback from 'axis3d/feedback'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Sphere from 'axis3d/mesh/sphere'
import Mouse from 'axis3d/input/mouse'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import Image from 'axis3d/media/image'
import clamp from 'clamp'
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
  //wireframe: true,
  color: [0.8, 0.8, 0.85, .5],
  radius: 500,
  envmap: Image(ctx, '/govball.jpg')
})

const sphere = Sphere(ctx)
const light = AmbientLight(ctx)
const plane = Plane(ctx, {
  wireframe: true,
  segments: {x: 64, y: 64},
  color: [0.8, 0.8, 0.8, 1],
  size: {x: 300, y: 300},

  rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
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

// swap targets every 10s following new target
window.target = sphere.position
let i = 0
setInterval(() => {
  target = i++ % 2 ? sphere.position : box.position
}, 10000)

const scale = [0, 0, 0]
feedback({scale})

frame(({time}) => {
  // vignette background effect
  color[1] = 0.025*time % 128
  color[2] = Math.sin(0.25*time) % 255
  background({reduction: 5, color})

  // update controller state
  controller()

  mouse(({wheel}) => {
    // lerp into scene
    if (!wheel.deltaY) {
      vec3.lerp(camera.position, camera.position, [0, 0, 50], 0.0125)
    }
  })

  // viewer
  const off = 20
  const d = 40
  let s = 0

  // lerp to target
  camera({scale: [.5, .5, .5], target: vec3.lerp([], camera.target, target, 0.025)}, () => {

    // draw world
    world({scale: [-1, -1, 1], rotation: quat.setAxisAngle([], [1, 0, 0], 0.05*time)}, () => {
      vec3.lerp(scale, scale, [.99, .90, .99], 0.125)
      // draw world feedback
      feedback({scale})

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
      s = clamp(off + (1.0 - 1.0*Math.cos(time)), 0, Infinity)
      box({position, opacity: 0, scale: [2*s, 2*s, 2*s], before: () => {
        // reflect world on box
        feedback({scale: [2+Math.cos(time), 2+Math.sin(time), 1+Math.cos(time)]})
      }})

      // oscillate sphere
      translate(s + (d - d*Math.sin(time)), s + (0.5 - 0.5*Math.cos(time)), 0)
      s = off + (0.5 - 0.5*Math.cos(time))
      // draw sphere with feedback
      sphere({position, scale: [s, s, s], before: () => {
        // reflect world on sphere
        feedback({scale: [1, 1, 1]})
      }})
    })
  })
})
