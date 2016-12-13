'use strict'

import { Triangle } from 'axis3d/mesh'
import {
  Context,
  Camera,
  Frame,
}  from 'axis3d'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx)
const triangle = Triangle(ctx)

frame(({time}) => {
  camera({position: [0, 0, 1]}, () => {
    triangle({color: [0, 0, 1, 1]})
  })
})
