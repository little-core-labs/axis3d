'use strict'

import {
  DirectionalLight,
  LambertMaterial,

  Geometry,
  Context,
  Camera,
  Frame,
  Lines,
  Mesh,
} from 'axis3d'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

//
import complex from 'snowden'

const ctx = Context({clear: {color: [0, 0, 0, 1], depth: true}})

const material = LambertMaterial(ctx)
const directional = DirectionalLight(ctx)
const camera = Camera(ctx, { position: [0, 10, 30] })
const frame = Frame(ctx)

// mesh rotation
const rotation = [0, 0, 0, 1]

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
  const geometry = new Geometry({complex})
  const mesh = Mesh(ctx, {geometry})
  return mesh
})()

frame(({time}) => {
  camera({}, () => {

    directional({
      color: directionalLightColor,
      position: [20, 20, 20]
    })

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      const rot = quat.setAxisAngle([], [0, 1, 0], 0.5*time)
      quat.slerp(rotation, rotation, rot, 0.01)
      draw({
        rotation,
        scale: [3, 3, 3],
        opacity: materialOpacity,
      })
    })
  })
})
