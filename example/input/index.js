'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  PhongMaterial,
  PlaneGeometry,
  Quaternion,
  LinesMesh,
  Vector3,
  Context,
  Color,
  Input,
  Frame,
  Mesh,
} from 'axis3d'

import Teapot from 'teapot'
import events from 'dom-events'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = Context()
const teapot = Mesh(ctx, {geometry: Teapot})
const frame = Frame(ctx)
const color = Color('cyan')
const light = DirectionalLight(ctx)
const plane = LinesMesh(ctx, {geometry: PlaneGeometry({segments: 20})})
const camera = PerspectiveCamera(ctx)
const position = Vector3()
const material = PhongMaterial(ctx)
const rotation = Quaternion()

// create input stream with clientX and clientY context properties
const input = Input(ctx, {
  props: ['clientX', 'clientY'],
  init({}, {stream}) {
    events.on(document, 'mousemove', (e) => {
      if (false == stream.write(e)) {
        stream.resume()
      }
    })
  }
})

frame(({time, viewportWidth, viewportHeight}) => {
  input(({clientX = maxX, clientY = maxY}) => {
    let maxX = 0.5*viewportWidth
    let maxY = 0.5*viewportHeight
    let r = window.devicePixelRatio
    let x = ((r*clientX - maxX)/maxX || 0) + 2
    let z = ((r*clientY - maxY)/-maxY || 0) + 2

    vec3.lerp(position, position, [-x, 0, z], 0.05)
    quat.setAxisAngle(rotation, [0, 1, 0], 0.5*time)
    camera({position: [position.x, 1, position.z]}, () => {
      light({position: [5, 5, 5]})

      material({color}, () => {
        teapot({rotation, scale: 0.2 })
      })

      material({color: Color('white')}, () => {
        plane({
          position: [0, -0.08, 0],
          scale: 5,
          rotation: quat.setAxisAngle([], [1, 0, 0], -0.25*Math.PI)
        })
      })
    })
  })
})
