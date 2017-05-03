'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  PhongMaterial,
  BoxGeometry,
  Quaternion,
  WebVRInput,
  Geometry,
  Context,
  Vector3,
  Color,
  Frame,
  Mesh,
} from 'axis3d'

import Bunny from 'bunny'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const vrDisplays = []

const ctx = Context()
const material = PhongMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const light = DirectionalLight(ctx)
const frame = Frame(ctx)

const webvr = WebVRInput(ctx)

const bunny = Mesh(ctx, {geometry: Geometry({complex: Bunny})})
const box = Mesh(ctx, {geometry: BoxGeometry()})

const rotation = Quaternion()
const position = Vector3(0, 0, 0)
const angle = Quaternion()
const color = Color('cyan')

if ('function' == typeof navigator.getVRDisplays) {
// fetch vr displays
navigator
  .getVRDisplays()
  .then((displays) => Object.assign(vrDisplays, displays))
  .catch((err) => { ctx.emit('error', err) })
}

frame(({time}) => {
  light({position: [5, 5, 5]})
  quat.setAxisAngle(angle, [0, 1, 0], 0.125*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  webvr({vrDisplay: vrDisplays[0]}, ({ projection, view, pose, eye }) => {
    // twice
    camera({
      projection,
      view
    }, () => {
      material({color}, () => {
        box({wireframe: true, rotation, position: [0, 0, -2.5]}, () => {
          bunny({scale: 0.25, position: [0, -0.25, 0]})
        })
      })
    })
  })
})
