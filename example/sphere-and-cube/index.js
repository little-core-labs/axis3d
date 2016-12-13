'use strict'

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Sphere,
  Box,
} from 'axis3d/mesh'

import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import raf from 'raf'

const ctx = Context()
const box = Box(ctx)
const frame = Frame(ctx)
const world = Sphere(ctx, {
  radius: 20,
  wireframe: true,
})
const sphere = Sphere(ctx, {raidus: 1})
const camera = Camera(ctx)
const positions = []
const count = 5

for (let i = 0; i < count; ++i) {
  const offset = [2, 2, 2] // 2*radius
  positions.push(vec3.add([], offset, vec3.random([], i*i*i)))
}

frame(({time}) => {
  camera({
    rotation: quat.multiply(
      quat.setAxisAngle([], [1, 0, 0], 0.125*time),
      quat.setAxisAngle([], [0, 1, 0], 0.125*time),
      quat.setAxisAngle([], [0, 0, 1], 0.125*time)
    ),
    position: [0, 0, 40]
  }, () => {
    const cellCount = (300*time % world.geometry.wireframe.cells.length)|0
    world({
      count: cellCount,
      wireframeThickness: 0.01 + Math.sin(time),
      color: [
        0.8 + Math.sin(0.05*time) % 1,
        0.8 + Math.sin(0.05*time) % 1,
        0.8 + Math.sin(0.05*time) % 1,
        0.8 + Math.sin(0.05*time) % 1
      ],
    }, () => {
      sphere({
        wireframe: true,
        wireframeThickness: 0.002,
        rotation: quat.setAxisAngle([], [1, 0, 0], time),
        position: [5, 0, 0]}, () => {
        for (let i = 0 ; i < count; ++i) {
          box({
            color: [0.8, 1, 0.8, 1.0],
            position: positions[i]
          })
        }
      })

      box({
        wireframe: true,
        rotation: quat.setAxisAngle([], [1, 0, 0], time),
        position: [-5, 0, 0]}, () => {
        for (let i = 0 ; i < count; ++i) {
          sphere({
            color: [0.8, 1, 0.8, 1.0],
            position: positions[i]
          })
        }
      })
    })
  })
})
