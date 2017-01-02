'use strict'

import {
  Material,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PlaneGeometry
} from 'axis3d/geometry'

import {
  OrientationInput,
  TouchInput,
  MouseInput,
} from 'axis3d/input'

import Bunny from 'bunny'
import quat from 'gl-quat'

const ctx = Context()

const material = Material(ctx)
const camera = Camera(ctx, { position: [-5, 12, 18] })
const bunny = Mesh(ctx, { wireframe: true, geometry: Bunny })
const frame = Frame(ctx)
const plane = Mesh(ctx, {
  wireframe: true,
  rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
  geometry: PlaneGeometry({ segments: 16, size: 30 })
})

// inputs
const orientation = OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const inputs = { orientation, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, { camera, inputs })

frame(() => {
  orbitCamera(() => {
    material({ color: [0.8, 0.8, 1.0, 0.9] }, () => {
      plane()
      bunny()
    })
  })
})
