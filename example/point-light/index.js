'use strict'

import { OrbitCameraController } from '../../extras/controller'
import VignetteBackground from '../../extras/backgrounds/vignette'

import {
  LambertMaterial,
  PhongMaterial,
  FlatMaterial,

  PointLight,

  SphereGeometry,
  BoxGeometry,
  Geometry,

  OrientationInput,
  TouchInput,
  MouseInput,

  PerspectiveCamera,
  Context,
  Frame,
  LinesMesh,
  Mesh,
  Quaternion,
  Vector3,
  Color,
} from 'axis3d'

import ControlPanel from 'control-panel'
import coalesce from 'defined'
import Bunny from 'bunny'
import clamp from 'clamp'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import Ray from 'ray-3d'

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

const ctx = Context()

const material = PhongMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)

const rotation = Quaternion()
const angle = Quaternion()

// inputs
const orientation =  OrientationInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

const orbitCamera = OrbitCameraController(ctx, {
  camera: camera,
  inputs: {orientation, touch, mouse},
})

const bunny = (() => {
  const material = PhongMaterial(ctx)
  const mesh = Mesh(ctx, {geometry: Geometry({complex: Bunny, flatten: true})})
  const lines = LinesMesh(ctx, {
    geometry: Bunny,
    thickness: 0.05,
    scale: [1.00125, 1.00125, 1.00125]
  })
  return (state = {}, block) => {
    if (true == state.wireframe) {
      lines({...state, wireframe: false}, block)
    } else {
      mesh(state, ({}, args) => {
        material({
          color: [1, 1, 1, 1.0],
          opacity: coalesce(state.opacity, 1),
        }, (...args) => {

          lines({visible: coalesce(state.segments || state.wireframe, true)})
          block(...args)
        })
      })
    }
  }
})()

const point = (() => {
  const material = FlatMaterial(ctx)
  const geometry = SphereGeometry({radius: 0.05, segments: 2})
  const sphere = Mesh(ctx, {geometry})
  const light = PointLight(ctx)
  return (state = {}, block) => {
    material(state, ({}, args = {}, id) => {
      sphere(args, () => {
        light({ ...args, radius: geometry.radius})
      })
    })
  }
})()

const lightXColor = Color('white')
const lightYColor = Color('dark magenta') // https://drafts.csswg.org/css-color/#valdef-color-darkmagenta
const lightZColor = Color('dark blue')

let lightXVisible = true
let lightYVisible = true
let lightZVisible = true

let materialWireframe = false
let materialLineSegments = true
let materialOpacity = 1.0;
const materialEmissive = [0, 0, 0, 1]
const materialColor = Color(Color('dark cyan') - 0x000030)

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
    label: 'LinesMesh',
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

  materialLineSegments = Boolean(coalesce(e['LinesMesh'], materialLineSegments))
  materialWireframe = Boolean(coalesce(e['Wireframe'], materialWireframe))
  materialOpacity = Number(coalesce(e['Opacity'], materialOpacity))
})

const position = Vector3(0, 0, 0)
window.position = position

frame(({time, lights, clear}) => {
  //clear({color: Color('dark slate gray')})
  orbitCamera({target: [0, 0, 0], position: [0, 5, 15] }, () => {
    // lights
    point([{
      visible: lightXVisible,
      color: lightXColor,
      position,
    },{
      visible: lightYVisible,
      color: lightYColor,
      position: vec3.negate([], position),
    }, {
      visible: lightZVisible,
      color: lightZColor,
      position:
      vec3.transformQuat(
        [],
        vec3.add([], vec3.negate([], position), [0.5, 0.5, 0.5]),
        quat.setAxisAngle([], [0, 0, 1], 0.5*time)),
    }])

    material({
      color: materialColor,
      emissive: materialEmissive,
      opacity: materialOpacity,
    }, () => {
      quat.setAxisAngle(angle, [0, 1, 0], 0.1*time)
      quat.slerp(rotation, rotation, angle, 0.01)
      bunny({
        wireframe: materialWireframe,
        segments: materialLineSegments,
        opacity: materialOpacity,
        rotation
      }, ({position: bunnyPosition, geometry, transform, tick}) => {
        mouse(({buttons, deltaX: dx, deltaY: dy}) => {
          const i = parseInt(tick/24) % geometry.positions.length + 1
          const pos = vec3.transformMat4([], geometry.positions[i], transform)
          dx = 0.5*clamp(dx, 0.1, 10)
          dy = 0.8*clamp(dy, 0.1, 10)
          vec3.lerp(position, position, vec3.add([], [dx, dy, 0], pos), 0.01)
        })
      })
    })
  })
})
