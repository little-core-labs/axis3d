'use strict'

window.WebVRConfig = {
  //FORCE_ENABLE_VR: true,
  //BUFFER_SCALE: 1,
  //DIRTY_SUBMIT_FRAME_BINDINGS: true
}

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

import events from 'dom-events'
import Stats from 'stats.js'
import ready from 'domready'
import Bunny from 'bunny'
import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import raf from 'raf'

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
const position = Vector3(0, 0, 5)
const angle = Quaternion()
const color = Color('cyan')

const stats = new Stats()

if ('function' == typeof navigator.getVRDisplays) {
  // fetch vr displays
  navigator
    .getVRDisplays()
    .then((displays) => Object.assign(vrDisplays, displays))
    .catch((err) => { ctx.emit('error', err) })
}

const scene = () => {
  material({color}, () => {
    box({wireframe: true, rotation, position: [0, 0, -2.5]}, () => {
      bunny({scale: 0.25, position: [0, -0.25, 0]})
    })
  })
}

let isWebVREnabled = false

ready(() => {
  document.body.appendChild(stats.dom)
  events.on(document.querySelector('#enable-webvr'), 'click', onclick)
  events.on(document.querySelector('#enable-webvr'), 'touchend', onclick)
  function onclick() { isWebVREnabled = !isWebVREnabled }
})

frame(({time}) => {
  stats.begin()
  light({position: [5, 5, 5]})
  quat.setAxisAngle(angle, [0, 1, 0], 0.125*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  if (isWebVREnabled) {
    webvr({vrDisplay: vrDisplays[0]}, ({ projection, view, pose, eye }) => {
      camera({ position, projection, view}, scene)
    })
  } else {
    camera({position}, scene)
  }
  stats.end()
})
