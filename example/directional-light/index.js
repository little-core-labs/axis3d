'use strict'

import { OrbitCameraController } from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  DirectionalLight,
  LambertMaterial,
  PhongMaterial,
  BoxGeometry,
  TouchInput,
  MouseInput,
  LinesMesh,
  Context,
  Frame,
  Mesh,
} from 'axis3d'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = Context()

const material = LambertMaterial(ctx)
const directional = DirectionalLight(ctx)
const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)

// box rotation
const rotation = [0, 0, 0, 1]

// inputs
const orientation =  OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

let materialLineSegments = true
let materialOpacity = 1.0;
const directionalLightColor = [1, 1, 1, 1]
const materialEmissive = [0, 0, 0, 1]
const materialColor = [0.1, 0.5, 0.5, 1]

const rgb255 = (c) => c .slice(0, 3).map((n) => 255*n)

// control panel
const panel = ControlPanel([
  {
    type: 'color',
    label: 'Light',
    format: 'rgb',
    initial: `rgb(${rgb255(directionalLightColor).join(',')})`,
  }, {
    type: 'color',
    label: 'Color',
    format: 'rgb',
    initial: `rgb(${rgb255(materialColor).join(',')})`,
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
  }, {
    type: 'checkbox',
    label: 'LinesMesh',
    initial: materialLineSegments,
  }
], {theme: 'dark', position: 'top-left'})
.on('input', (e) => {
  const rgb = (prop) => {
    const match = String(e[prop]).match(/rgb\((.*)\)/)
    return !match ? null : match[1]
      .split(', ')
      .map(parseFloat)
      .map((n) => n/255)
  }

  Object.assign(directionalLightColor, rgb('Light') || [])
  Object.assign(materialEmissive, rgb('Emissive') || [])
  Object.assign(materialColor, rgb('Color') || [])

  materialLineSegments = Boolean(coalesce(
    e['LinesMesh'],
    materialLineSegments))

  materialOpacity = Number(coalesce(
    e['Opacity'],
    materialOpacity))
})

const box = (() => {
  const geometry = BoxGeometry()
  const material = LambertMaterial(ctx)
  const mesh = Mesh(ctx, {geometry})
  const lines = LinesMesh(ctx, {geometry})
  return (state = {}, block) => {
    mesh(state, ({}, args) => {
      material({
        color: [1, 1, 1, 1.0],
        opacity: coalesce(state.opacity, 1)
      }, () => {
        lines({
          visible: coalesce(state.segments, true),
          thickness: 0.0125,
          scale: [1.00125, 1.00125, 1.00125]
        })
      })
    })
  }
})()

frame(({time}) => {
  orbitCamera({position: [0, 0, 3]}, () => {
    directional({
      color: directionalLightColor,
      position: [10, 10, 10]
    })

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      const x = quat.setAxisAngle([], [1, 0, 0], 0.5*time)
      const z = quat.setAxisAngle([], [0, 0, 1], 0.5*time)
      quat.slerp(rotation, rotation, quat.multiply([], x, z), 0.01)
      box({
        rotation,
        segments: materialLineSegments,
        opacity: materialOpacity,
      })
    })
  })
})
