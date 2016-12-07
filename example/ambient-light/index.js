'use strict'

import VignetteBackground from 'axis3d/backgrounds/vignette'
import AmbientLight from 'axis3d/light/ambient'
import { Geometry } from 'axis3d/geometry'
import { Mesh } from 'axis3d/mesh'
import Bunny from 'bunny'
import quat from 'gl-quat'
import raf from 'raf'

import {
  Context,
  Camera,
  Frame,
} from 'axis3d'

const ctx = Context()
const frame = Frame(ctx)
const bunny = Mesh(ctx, {geometry: new Geometry({primitive: Bunny})})
const light = AmbientLight(ctx)
const camera = Camera(ctx, {position: [0, 0, -5]})
const background = VignetteBackground(ctx)

const rotation = [0, 0, 0, 1]
const rotate = (radians) => {
  const x = quat.setAxisAngle([], [1, 0, 0], +Math.cos(radians))
  const y = quat.setAxisAngle([], [0, 1, 0], -Math.sin(radians))
  quat.multiply(rotation, x, y)
}

window.bunny = bunny
frame(({time}) => {
  rotate(0.125*time)
  camera({
    rotation,
    position: [9, 0, 0],
  }, () => {
    light({intensity: Math.cos(time)}, () => {
      background({mix: 1, reduction: 2})
      bunny({scale: [0.5, 0.5, 0.5]})
    })
  })
})
