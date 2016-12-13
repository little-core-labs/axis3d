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
const draw = Mesh(ctx, {
  wireframe: true,
  geometry: new Geometry({complex})
})

const orbitCamera = OrbitCameraController(ctx, {
  camera: Camera(ctx, {position: [0, 0, 20]}),
  inputs: {mouse: Mouse(ctx)}
})

frame(({time}) => {
  orbitCamera(() => {
    draw()
  })
})
