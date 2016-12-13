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
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Sphere,
  Plane,
  Box,
} from 'axis3d/mesh'

import Feedback from './feedback'

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
const feedback = Feedback(ctx, {scale: [1, 1, 1]})
const background = VignetteBackground(ctx)

const position = [1600, 1600, 1600]
const camera = Camera(ctx, {position})

const orbitCamera = OrbitCameraController(ctx, {
  orientation: [Math.PI/8, -0.3, 0],
  inputs: {mouse},
  camera, position
})

const world = Sphere(ctx, {
  radius: 500,
  scale: [-0.99, -0.99, 0.99],
  color: [0.8, 0.8, 0.85, .8],
  map: Image(ctx, '/govball.jpg'),
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


Object.assign(window, {
  orbitCamera,
  wireframe,
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

// mouse input loop
frame(({time}) => {
  mouse(({wheel}) => {
    // lerp into scene
    if (!wheel.deltaY) {
      vec3.lerp(position, position, [0, 0, 300], 0.0125)
    }
  })
})

// world
frame(({time}) => {
  orbitCamera({
    position,
    target: vec3.lerp([], camera.target, target, 0.025)
  }, ({position: newPosition} = {}) => {
    //vec3.copy(position, newPosition || position)
    const rotation = quat.setAxisAngle([], [1, 0, 0], 0.05*time)
    // draw world
    wireframe({rotation}, () => {
      world(() => { })
      plane({position: [0, 0, 0]})
      const off = 20
      quat.multiply(
        quat.setAxisAngle(rotation, [1, 0, 0], 0.5*time),
        quat.setAxisAngle([], [0, 1, 0], 0.5*time),
        quat.setAxisAngle([], [0, 0, 1], 0.5*time)
      )

      // orbit box around origin
      let sx = 1 + (0.5-0.5*Math.cos(time))

      // draw box with feedback
      let sy = clamp(off + (1.0-1.0*Math.cos(time)), 0, Infinity)
      box({
        position: vec3.transformQuat([], [sx+300, sx+0.5, sx+10], rotation),
        opacity: 0,
        scale: [2*sy, 1*sy, 2*sy],
        before() {
          // reflect world on box
          feedback({
            scale: [2+Math.cos(time), 2+Math.sin(time), 1+Math.cos(time)]
          })
        }
      })

      const d = 40
      let s = 0

      // oscillate sphere
      sx = clamp(off + (1.0 - 1.0*Math.cos(time)), 0, Infinity)
      sy = off + (0.5 - 0.5*Math.cos(time))

      // draw sphere with feedback
      sphere({
        position: [
          sx + (d-d*Math.sin(time)),
          sx + (0.5-0.5*Math.cos(time)),
          0
        ],
        opacity: 0,
        scale: [sy, sy, sy],
        before() {
          // reflect world on sphere
          feedback({
            scale: [1, 1, 1]
          })
        }
      })
    })
  })
})
