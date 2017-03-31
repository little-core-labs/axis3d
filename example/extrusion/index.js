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
} from 'axis3d'

import * as shapes from './shapes'
import quat from 'gl-quat'

const ctx = Context()

const material = PhongMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const light = DirectionalLight(ctx)
const frame = Frame(ctx)
const group = Object3D(ctx)

const triangle = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.triangle)})
const hexagon = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.hexagon)})
const circle = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.circle)})
const helix = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.helix)})
const heart = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.heart)})
const box = Mesh(ctx, {geometry: ExtrudeGeometry(shapes.square)})

const rotation = Quaternion()
const position = Vector3(0, 5, 5)
const angle = Quaternion()

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.25*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  camera({position}, () => {
    light({position: [2, 0, 5], intensity: 1})
    material({
      shininess: 60,
      specular: Color('white'),
      radius: 0.1,
      color: Color('purple'),
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
