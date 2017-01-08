'use strict'

import { OrbitCameraController } from '../../extras/controller'
import VignetteBackground from '../../extras/backgrounds/vignette'

import {
  LambertMaterial,
  FlatMaterial,

  PointLight,

  SphereGeometry,
  BoxGeometry,
  Geometry,

  OrientationInput,
  TouchInput,
  MouseInput,

  Context,
  Camera,
  Frame,
  Mesh,
  Lines,
} from 'axis3d'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import Bunny from 'bunny'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

for (let p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = Context({clear: {color: [0, 0, 0, 1], depth: true}})

const material = LambertMaterial(ctx)
const camera = Camera(ctx, { position: [0, 10, 10] })
const frame = Frame(ctx)

const rotation = [0, 0, 0, 1]
const angle = [0, 0, 0, 1]

// inputs
const orientation =  OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

const bunny = (() => {
  const material = LambertMaterial(ctx)
  const mesh = Mesh(ctx, {geometry: new Geometry({complex: Bunny, flatten: true})})
  const lines = Lines(ctx, {
    geometry: Bunny,
    thickness: 0.05,
    scale: [1.00125, 1.00125, 1.00125]
  })
  return (state = {}, block) => {
    if (true == state.wireframe) {
      lines({...state, wireframe: false})
    } else {
      mesh(state, ({}, args) => {
        material({
          color: [1, 1, 1, 1.0],
          opacity: coalesce(state.opacity, 1),
        }, () => {
          lines({visible: coalesce(state.segments || state.wireframe, true)})
        })
      })
    }
  }
})()

const point = (() => {
  //const material = LambertMaterial(ctx)
  const material = FlatMaterial(ctx)
  const geometry = SphereGeometry({radius: 0.05, segments: 2})
  const sphere = Mesh(ctx, {geometry})
  const light = PointLight(ctx)
  return (state = {}, block) => {
    const power = 2 - (1 + Math.cos(ctx.regl.now()))
    if (Array.isArray(state)) {
      for (let s of state) {
        s.scale = [power, power, power]
        s.radius = 1.5*power
      }
    } else {
      state.scale = [power, power, power]
      state.radius = 1.5*power
    }

    material(state, ({}, args = {}) => {
      sphere(args, () => {
        light(args)
      })
    })
  }
})()

const lightXColor = [0.1, 0.1, 0.8, 1]
const lightYColor = [0.8, 0.1, 0.8, 1]
const lightZColor = [0.2, 0.8, 0.2, 1]
let lightXVisible = true
let lightYVisible = true
let lightZVisible = true

let materialWireframe = false
let materialLineSegments = true
let materialOpacity = 1.0;
const materialEmissive = [0, 0, 0, 1]
const materialColor = [0.1, 0.5, 0.5, 1]

const rgb255 = (c) => c .slice(0, 3).map((n) => 255*n)

// control panel
const panel = ControlPanel([
  {
    type: 'color',
    label: 'Light X',
    format: 'rgb',
    initial: `rgb(${rgb255(lightXColor).join(',')})`,
  }, {
    type: 'color',
    label: 'Light Y',
    format: 'rgb',
    initial: `rgb(${rgb255(lightYColor).join(',')})`,
  }, {
    type: 'color',
    label: 'Light Z',
    format: 'rgb',
    initial: `rgb(${rgb255(lightZColor).join(',')})`,
  }, {
    type: 'checkbox',
    label: 'Show Light X?',
    initial: lightXVisible,
  }, {
    type: 'checkbox',
    label: 'Show Light Y?',
    initial: lightYVisible,
  }, {
    type: 'checkbox',
    label: 'Show Light Z?',
    initial: lightZVisible,
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
    label: 'Lines',
    initial: materialLineSegments,
  }, {
    type: 'checkbox',
    label: 'Wireframe',
    initial: materialWireframe,
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

  Object.assign(lightXColor, rgb('Light X') || [])
  Object.assign(lightYColor, rgb('Light Y') || [])
  Object.assign(lightZColor, rgb('Light Z') || [])

  lightXVisible = Boolean(coalesce(e['Show Light X?'], lightXVisible))
  lightYVisible = Boolean(coalesce(e['Show Light Y?'], lightYVisible))
  lightZVisible = Boolean(coalesce(e['Show Light Z?'], lightZVisible))

  Object.assign(materialEmissive, rgb('Emissive') || [])
  Object.assign(materialColor, rgb('Color') || [])

  materialLineSegments = Boolean(coalesce(e['Lines'], materialLineSegments))
  materialWireframe = Boolean(coalesce(e['Wireframe'], materialWireframe))
  materialOpacity = Number(coalesce(e['Opacity'], materialOpacity))
})

frame(({time}) => {
  // point lights position
  const position = [-5, -5, -5]
  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [1, 0, 0], 0.5*time))

  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [0, 1, 0], 0.5*time))

  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [0, 0, 1], 0.5*time))

  orbitCamera({}, () => {
    // lights
    point([
      {
        visible: lightXVisible,
        color: lightXColor,
        position,
      }, {
        visible: lightYVisible,
        color: lightYColor,
        position: vec3.negate([], position),
      },
      {
        visible: lightZVisible,
        color: lightZColor,
        position:
          vec3.transformQuat(
            [],
            vec3.add([], vec3.negate([], position), [2, 2, 2]),
            quat.setAxisAngle([], [0, 0, 1], 0.5*time)),
      },
    ])

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
      quat.slerp(rotation, rotation, angle, 0.01)
      bunny({
        rotation,
        wireframe: materialWireframe,
        segments: materialLineSegments,
        opacity: materialOpacity,
      })
    })
  })
})
