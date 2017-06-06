'use strict'

import {
  PerspectiveCamera,
  OrientationInput,
  PhongMaterial,
  FlatMaterial,
  AmbientLight,
  TouchInput,
  MouseInput,
  Context,
  Frame,
  Color,
  LinesMesh,
  Mesh,
} from '../../src'

import { OrbitCameraController } from '../../extras/controller'
import ControlPanel from 'control-panel'
import coalesce from 'defined'
import Bunny from 'bunny'
import quat from 'gl-quat'

for (let p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = new Context()

const material = new PhongMaterial(ctx)
const camera = new PerspectiveCamera(ctx)
const light = new AmbientLight(ctx)
const frame = new Frame(ctx)
const lines = new LinesMesh(ctx, {geometry: Bunny})
const mesh = new Mesh(ctx, {geometry: Bunny})

// bunny rotation
const rotation = [0, 0, 0, 1]

// draw bunny
const bunny = (state = {}, block) => {
  mesh(state, ({}, args) => {
    material({blending: true, color: [1, 1, 1, 1.0], opacity: 1}, () => {
      lines({
        thickness: 0.01,
        scale: 1.001,
      })
    })
  })
}

// inputs
const orientation =  new OrientationInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)
const orbitCamera = new OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

// ambient light color
const ambientLightColor = new Color('white')
const materialEmissive = [0, 0, 0, 1]
const materialColor = new Color('purple')
let materialOpacity = 1.0;

const rgb255 = (c) => c .slice(0, 3).map((n) => 255*n)

// control panel
const panel = ControlPanel([
  {
    type: 'color',
    label: 'Light',
    format: 'rgb',
    initial: `rgb(${ambientLightColor.slice(0, 3).map((n) => n * 255).join(',')})`,
  }, {
    type: 'color',
    label: 'Color',
    format: 'rgb',
    initial: `rgb(${materialColor.slice(0, 3).map((n) => n * 255).join(',')})`,
  }, {
    type: 'color',
    label: 'Emissive',
    format: 'rgb',
    initial: `rgb(${rgb255(materialEmissive).join(',')})`,
  }, {
    min: 0,
    max: 1,
    type: 'range',
    label: 'Opacity',
    initial: materialOpacity,
  }
], {theme: 'dark', position: 'top-left'})
.on('input', (e) => {
  const rgb = (prop) => {
    const match = String(e[prop]).toLowerCase().match(/rgb\((.*)\)/)
    return !match ? [] : match[1]
      .split(', ')
      .map(parseFloat)
      .map((n) => n/255)
  }

  Object.assign(ambientLightColor, rgb('Light') || [])
  Object.assign(materialEmissive, rgb('Emissive') || [])
  Object.assign(materialColor, rgb('Color') || [])
  materialOpacity = Number(coalesce(e['Opacity'], materialOpacity))
})

frame(({time}) => {
  orbitCamera({ position: [0, 5, 15] }, () => {
    light({color: ambientLightColor})
    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      const angle = quat.setAxisAngle([], [0, 1, 0], 0.5*time)
      quat.slerp(rotation, rotation, angle, 0.01)
      bunny({rotation})
    })
  })
})
