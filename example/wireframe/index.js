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
} from '../../src'

import { OrbitCameraController } from '../../extras/controller'

import Bunny from 'bunny'
import quat from 'gl-quat'

const ctx = new Context()

const material = new LambertMaterial(ctx)
const camera = new PerspectiveCamera(ctx, { position: [-5, 12, 18] })
const light = new DirectionalLight(ctx)
const bunny = new LinesMesh(ctx, {geometry: Bunny, thickness: 0.05})
const frame = new Frame(ctx)

// inputs
const orientation = new OrientationInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)

const inputs = { orientation, touch, mouse }
const orbitCamera = new OrbitCameraController(ctx, { camera, inputs })

frame(() => {
  orbitCamera(() => {
    light({position: [5, 0, 5]})
    material({ color: new Color('cyan') }, () => {
      bunny()
    })
  })
})
