'use strict'

import {
  PerspectiveCamera,
  OrientationInput,
  DirectionalLight,
  LambertMaterial,
  TouchInput,
  MouseInput,
  LinesMesh,
  Context,
  Color,
  Frame,
  Mesh,
} from 'axis3d'

import { OrbitCameraController } from '../../extras/controller'

import Bunny from 'bunny'
import quat from 'gl-quat'

const ctx = Context()

const material = LambertMaterial(ctx)
const camera = PerspectiveCamera(ctx, { position: [-5, 12, 18] })
const light = DirectionalLight(ctx)
const bunny = LinesMesh(ctx, {geometry: Bunny, thickness: 0.05})
const frame = Frame(ctx)

// inputs
const orientation = OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const inputs = { orientation, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, { camera, inputs })

frame(() => {
  orbitCamera(() => {
    light({position: [5, 0, 5]})
    material({ color: Color('cyan') }, () => {
      bunny()
    })
  })
})
