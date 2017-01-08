'use strict'

import {
  OrientationInput,
  LambertMaterial,
  DirectionalLight,
  PlaneGeometry,
  TouchInput,
  MouseInput,
  Context,
  Camera,
  Frame,
  Lines,
  Mesh,
} from 'axis3d'

import {
  OrbitCameraController
} from '../../extras/controller'

import Bunny from 'bunny'
import quat from 'gl-quat'

const ctx = Context()

const material = LambertMaterial(ctx)
const camera = Camera(ctx, { position: [-5, 12, 18] })
const light = DirectionalLight(ctx)
const bunny = Lines(ctx, {geometry: Bunny, thickness: 0.05})
const frame = Frame(ctx)
const plane = Lines(ctx, {
  rotation: quat.setAxisAngle([], [1, 0, 0], Math.PI/2),
  geometry: PlaneGeometry({ segments: 16, size: 30 }),
  thickness: 0.1,
})

// inputs
const orientation = OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const inputs = { orientation, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, { camera, inputs })

frame(() => {
  orbitCamera(() => {
    light({position: [40, 20, 20]})
    light({position: [0, -50, 0]})
    material({ color: [1, 1, 1, 1.0] }, () => {
      plane()
    })
    material({ color: [0.4, 0.4, 0.8, 1.0] }, () => {
      bunny()
    })
  })
})
