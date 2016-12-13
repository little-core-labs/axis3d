'use strict'

/**
 * Module dependencies.
 */

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

import {
  Plane,
  Mesh
} from 'axis3d/mesh'

import { OrbitCameraController } from 'axis3d/controller'
import { Geometry } from 'axis3d/geometry'
import { Mouse } from 'axis3d/input'

import complex from 'bunny'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import raf from 'raf'

const ctx = Context()
const frame = Frame(ctx)
const plane = Plane(ctx, {
  wireframe: true,
  rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
  segments: 16,
  color: [0.8, 0.8, 1.0, 0.9],
  size: 10,
})
const draw = Mesh(ctx, {
  wireframe: true,
  geometry: new Geometry({complex})
})

const orbitCamera = OrbitCameraController(ctx, {
  inputs: {mouse: Mouse(ctx)},
  camera: Camera(ctx, {
    position: [-5, 12, 18]
  }),
})

frame(({time}) => {
  orbitCamera(() => {
    plane()
    draw()
  })
})
