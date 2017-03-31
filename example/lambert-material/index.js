'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  LambertMaterial,
  Quaternion,
  Geometry,
  Context,
  Color,
  Frame,
  Lines,
  Mesh,
} from 'axis3d'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

import complex from 'snowden'

const ctx = Context()

const directional = DirectionalLight(ctx)
const material = LambertMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)

// mesh rotation
const rotation = Quaternion()

let materialOpacity = 1.0;
const directionalLightColor = Color('white')
const materialEmissive = [0, 0, 0, 1]
const materialColor = Color('pale violet red')

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

  materialOpacity = Number(coalesce(
    e['Opacity'],
    materialOpacity))
})

const draw = (() => {
  const material = LambertMaterial(ctx)
  const geometry = Geometry({complex})
  const mesh = Mesh(ctx, {geometry})
  return mesh
})()

frame(({time}) => {
  camera({position: [0, 2, 10]}, () => {

    directional({
      color: directionalLightColor,
      position: [10, 10, 10]
    })

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      const rot = quat.setAxisAngle([], [0, 1, 0], 0.5*time)
      quat.slerp(rotation, rotation, rot, 0.01)
      draw({ rotation })
    })
  })
})
