'use strict'

import {
  DirectionalLight,
  LambertMaterial,
  PhongMaterial,
  AmbientLight,

  PerspectiveCamera,
  Quaternion,
  Geometry,
  Context,
  Color,
  Frame,
  Mesh,
} from '../../src'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import complex from 'snowden'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = new Context()

const directional = new DirectionalLight(ctx)
const material = new PhongMaterial(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)

// mesh rotation
const rotation = new Quaternion()

// light color
const directionalLightColor = new Color('white')

let materialOpacity = 1.0;
let materialShininess = 80;
const materialSpecular = new Color('lavender')
const materialEmissive = new Color('black')
const materialColor = new Color(0.1*255, 0.5*255, 0.5*255, 1)

const rgb255 = (c) => c .slice(0, 3).map((n) => 255*n)

// control panel
const panel = new ControlPanel([
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
    type: 'color',
    label: 'Specular',
    format: 'rgb',
    initial: `rgb(${rgb255(materialSpecular).join(',')})`,
  },{
    min: 0,
    max: 1,
    type: 'range',
    label: 'Opacity',
    initial: materialOpacity,
  }, {
    min: 0,
    max: 100,
    type: 'range',
    label: 'Shininess',
    initial: materialShininess,
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
  Object.assign(materialSpecular, rgb('Specular') || [])
  Object.assign(materialEmissive, rgb('Emissive') || [])
  Object.assign(materialColor, rgb('Color') || [])

  materialOpacity =
    Number(coalesce(e['Opacity'], materialOpacity))

  materialShininess =
    Number(coalesce(e['Shininess'], materialShininess))})

const draw = (() => {
  const geometry = new Geometry({complex})
  const mesh = new Mesh(ctx, {geometry})
  return mesh
})()

frame(({time, lights}) => {
  camera({position: [0, 2, 10]}, () => {

    const rot = quat.setAxisAngle([], [0, 1, 0], 0.1*time)
    quat.slerp(rotation, rotation, rot, 0.01)
    directional({
      color: directionalLightColor,
      position: [5, 5, 5],
      intensity: 1.5,
    })

    directional({
      color: directionalLightColor,
      position: [-10, -10, -10],
      intensity: 2,
    })

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
      shininess: materialShininess,
      specular: materialSpecular,
    }, () => {
      draw({
        rotation,
        opacity: materialOpacity,
      })
    })
  })
})
