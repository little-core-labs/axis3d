'use strict'

import {
  Triangle,
  Box
} from 'axis3d/mesh'

import {
  Context,
  Camera,
  Frame,
}  from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx)
const triangle = Triangle(ctx)
const box = Box(ctx)

frame(({time}) => {
  camera({
    rotation: [0, 0, 0, 1],
    position: [0, 0, 1]
  }, () => {
    triangle({color: [0, 0, 1, 1]})
    box({scale: [0.5, 0.5, 0.5], color: [0, 1, 0, 1]})
  })
})
