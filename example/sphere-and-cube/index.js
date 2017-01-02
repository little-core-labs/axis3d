'use strict'

import {
  Material,
  Context,
  Camera,
  Frame,
  Mesh
} from 'axis3d'

import {
  OrientationInput,
  TouchInput,
  MouseInput,
} from 'axis3d/input'

import {
  SphereGeometry,
  BoxGeometry,
} from 'axis3d/geometry'

import { OrbitCameraController } from '../../extras/controller'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import raf from 'raf'

const ctx = Context()
const frame = Frame(ctx)

const box = Mesh(ctx, { geometry: BoxGeometry() })
const world = Mesh(ctx, { geometry: SphereGeometry({ radius: 20 }) })
const sphere = Mesh(ctx, { geometry: SphereGeometry({ raidus: 1 }) })

const material = Material(ctx)
const camera = Camera(ctx)

// inputs
const orientation =  OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
  position: [0, 0, 200], // initial
})

const positions = []
const count = 5

for (let i = 0; i < count; ++i) {
  const offset = [2, 2, 2] // 2*radius
  positions.push(vec3.add([], offset, vec3.random([], i*i*i)))
}

frame(({time}) => {
  orbitCamera({
    rotation: quat.multiply(
      quat.setAxisAngle([], [1, 0, 0], 0.125*time),
      quat.setAxisAngle([], [0, 1, 0], 0.125*time),
      quat.setAxisAngle([], [0, 0, 1], 0.125*time)
    ),
  }, () => {
    let cellCount = 0
    // ready world geometry to get cell count
    world({draw: false}, ({geometry}) => {
      cellCount = (600*time % geometry.wireframe.cells.length)|0
    })

    material({ color: [ 0.8, 0.8, 0.8, 0.8, ] }, () => {
      world({
        wireframe: true,
        count: cellCount,
        wireframeThickness: 0.1,
      }, () => {
        material({ }, () => {
          sphere({
            wireframe: true,
            wireframeThickness: 0.002,
            rotation: quat.setAxisAngle([], [1, 0, 0], time),
            position: [5, 0, 0]}, () => {
              for (let i = 0 ; i < count; ++i) {
                material({ color: [0.8, 1, 0.8, 1.0] }, () => {
                  box({
                    color: [0.8, 1, 0.8, 1.0],
                    position: positions[i]
                  })
                })
              }
            })
        })

        box({
          wireframe: true,
          rotation: quat.setAxisAngle([], [1, 0, 0], time),
          position: [-5, 0, 0]
        }, () => {
          for (let i = 0 ; i < count; ++i) {
            material({ color: [0.8, 1, 0.8, 1.0] }, () => {
              sphere({
                position: positions[i]
              })
            })
          }
        })
      })
    })
  })
})
