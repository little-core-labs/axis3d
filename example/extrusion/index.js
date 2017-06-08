'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  TriangleGeometry,
  ExtrudeGeometry,
  PhongMaterial,
  Quaternion,
  Object3D,
  Vector3,
  Context,
  Color,
  Frame,
  Mesh,
} from '../../src'

import * as shapes from './shapes'
import quat from 'gl-quat'

const ctx = new Context()

const material = new PhongMaterial(ctx)
const camera = new PerspectiveCamera(ctx)
const light = new DirectionalLight(ctx)
const frame = new Frame(ctx)
const group = new Object3D(ctx)

const triangle = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.triangle)})
const hexagon = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.hexagon)})
const circle = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.circle)})
const helix = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.helix)})
const heart = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.heart)})
const box = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.square)})

const rotation = new Quaternion()
const position = new Vector3(0, 5, 5)
const angle = new Quaternion()

const purple = new Color('purple')
const white = new Color('white')

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.25*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  camera({position}, () => {
    light({position: [2, 0, 5], intensity: 1})
    material({
      shininess: 60,
      specular: white,
      radius: 0.1,
      color: purple,
    }, () => {
      quat.setAxisAngle(angle, [1, 0, 0], 0.25*Math.PI)
      group({rotation}, () => {
        switch (parseInt(time/3000*1000) % 6 + 1) {
          case 1: box(); break
          case 2: heart(); break
          case 3: circle(); break
          case 4: hexagon(); break
          case 5: triangle(); break
          case 6: helix({rotation: angle}); break
        }
      })
    })
  })
})
