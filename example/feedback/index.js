'use strict'

//
// This example uses the Feedback component to
// capture the current state of the drawing
// buffer and draw it to the scoped geometry.
//

import { OrbitCameraController } from 'axis3d/controller'
import VignetteBackground from 'axis3d/backgrounds/vignette'
import AmbientLight from 'axis3d/light/ambient'
import { Mouse } from 'axis3d/input'
import { Image } from 'axis3d/media'

import {
  Feedback,
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Sphere,
  Plane,
  Box,
} from 'axis3d/mesh'

import clamp from 'clamp'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import raf from 'raf'

const ctx = Context()
const box = Box(ctx, {position: [4, .5, 0]})
const frame = Frame(ctx)
const light = AmbientLight(ctx)
const mouse = Mouse(ctx)
const sphere = Sphere(ctx)
const feedback = Feedback(ctx, {scale: [0, 0, 0]})
const background = VignetteBackground(ctx)

const camera = Camera(ctx, {
  position: [1600, 1600, 1600],
  scale: [.5, .5, .5],
})

const world = Sphere(ctx, {
  envmap: Image(ctx, '/govball.jpg'),
  radius: 500,
  scale: [-0.99, -0.99, 0.99],
  color: [0.8, 0.8, 0.85, .8],
})

const wireframe = Sphere(ctx, {
  wireframe: true,
  radius: 500,
  color: [0.8, 0.8, 0.85, .5],
  scale: [1, 1, 1],
})

const plane = Plane(ctx, {
  wireframe: true,
  rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
  segments: {x: 64, y: 64},
  color: [0.8, 0.8, 0.8, 1],
  size: {x: 300, y: 300},
})

const controller = OrbitCameraController(ctx, {
  orientation: [Math.PI/8, -0.3, 0],
  inputs: {mouse},
  target: camera,
})

// reusable position vector
const position = [0, 0, 0]
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

// background loop
frame(({time}) => {
  const color = [0, 0, 0, 1]
  // vignette background effect
  color[1] = 0.025*time % 255
  color[2] = Math.sin(0.025*time) % 255
  background({reduction: 2, color})
})

// camera control
frame(({time}) => {
  // lerp to target
  camera({
    target: vec3.lerp([], camera.target, target, 0.025)
  })
})

// controller loop
frame(({time}) => {
  // update controller state
  controller()
  mouse(({wheel}) => {
    // lerp into scene
    if (!wheel.deltaY) {
      vec3.lerp(camera.position, camera.position, [0, 0, 100], 0.0125)
    }
  })
})

// world
frame(({time}) => {
  const rotation = quat.setAxisAngle([], [1, 0, 0], 0.05*time)
  camera(() => {
    // draw world
    wireframe({rotation}, () => {
      world()
    })
  })
})

// plane
frame(({time}) => {
  camera(() => {
    plane({position: [0, 0, 0]})
  })
})

// box
frame(({time}) => {
  const off = 20
  const rotation = quat.multiply(
    quat.setAxisAngle([], [1, 0, 0], 0.5*time),
    quat.setAxisAngle([], [0, 1, 0], 0.5*time),
    quat.setAxisAngle([], [0, 0, 1], 0.5*time)
  )

  camera(() => {
    // orbit box around origin
    let s = 2 + (0.5 - 0.5*Math.cos(time))
    translate(s + 300, s + 0.5, s + 10)
    vec3.transformQuat(position, position, rotation)

    // draw box with feedback
    s = clamp(off + (1.0 - 1.0*Math.cos(time)), 0, Infinity)
    box({
      position,
      opacity: 0,
      scale: [2*s, 2*s, 2*s],
      before() {
        // reflect world on box
        feedback({
          scale: [2+Math.cos(time), 2+Math.sin(time), 1+Math.cos(time)]
        })
      }
    })
  })
})

// sphere
frame(({time}) => {
  camera(() => {
    const off = 20
    const d = 40
    let s = 0

    // oscillate sphere
    s = clamp(off + (1.0 - 1.0*Math.cos(time)), 0, Infinity)
    translate(s + (d - d*Math.sin(time)), s + (0.5 - 0.5*Math.cos(time)), 0)
    s = off + (0.5 - 0.5*Math.cos(time))

    // draw sphere with feedback
    sphere({
      position,
      opacity: 0,
      scale: [s, s, s],
      before() {
        // reflect world on sphere
        feedback({
          scale: [1, 1, 1]
        })
      }
    })
  })
})
