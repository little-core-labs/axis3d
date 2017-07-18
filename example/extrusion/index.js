'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  TriangleGeometry,
  ExtrudeGeometry,
  PlaneGeometry,
  PhongMaterial,
  AmbientLight,
  Quaternion,
  LinesMesh,
  Geometry,
  Object3D,
  Vector3,
  Context,
  Color,
  Frame,
  Mesh,
  Fog,
} from '../../src'

import * as shapes from './shapes'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = new Context()

const material = new PhongMaterial(ctx)
const ambient = new AmbientLight(ctx)
const camera = new PerspectiveCamera(ctx)
const light = new DirectionalLight(ctx)
const frame = new Frame(ctx)
const group = new Object3D(ctx)
const fog = new Fog(ctx, {type: Fog.Exp2})

const triangle = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.triangle)})
const hexagon = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.hexagon)})
const circle = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.circle)})
const helix = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.helix)})
const heart = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.heart)})
const box = new Mesh(ctx, {geometry: new ExtrudeGeometry(shapes.square)})

const rotation = new Quaternion()
const position = new Vector3(10, 10, 10)
const angle = new Quaternion()

const purple = new Color('magenta')
const white = new Color('white')

let bottomY = 0

const line = (()=> {
  const defaultColor = new Color('cyan')
  const material = new PhongMaterial(ctx)
  const geometry = new Geometry({
    complex: {
      cells: [[0, 1, 2]],
      positions: [ [0, 0, 0], [0.5, 0.5, 0.5], [1, 1, 1]],
      get normals() { return this.positions },
    }
  })
  const mesh = new LinesMesh(ctx, {geometry})
  return ({
    direction = [0, 0, 0],
    lineWidth = 1,
    thickness = lineWidth || 0.05,
    rotation,
    position,
    scale = [1, 1, 1],
    color = defaultColor
  } = {}) => {
    if ('number' == typeof scale) {
      scale = Array(3).fill(scale)
    }
    material({color}, () => {
      mesh({
        scale: vec3.multiply([], direction, scale),
        position,
        rotation,
        lineWidth,
        thickness,
      })
    })
  }
})()

const plane = (() => {
  const geometry = new PlaneGeometry({size: 1, segments: 50})
  const material = new PhongMaterial(ctx, {color: new Color('dark gray') })
  const entity = new Object3D(ctx)
  const mesh = new LinesMesh(ctx, {
    geometry,
    scale: 10,
    wireframe: true,
    rotation: quat.setAxisAngle([], [1, 0,0], -0.25*Math.PI),
  })
  return (args) => {
    entity(args, () => material(() => mesh()))
  }
})()

const axes = (() => {
  const entity = new Object3D(ctx)
  return (args) => entity({scale: 50, ...args}, () => {
    line({thickness: 0.05, direction: [1, 0, 0], color: new Color('red')})
    line({thickness: 0.05, direction: [0, 1, 0], color: new Color('green')})
    line({thickness: 0.05, direction: [0, 0, 1], color: new Color('blue')})
  })
})()

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.25*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  camera({position}, () => {
    light({position: [20, 0, 20], intensity: 2})
    fog({color: white, density: 0.01})

    ambient({color: new Color(0xffffff)})
    plane({position: [0, bottomY, 0]})
    axes({position: [0, bottomY, 0]})

    material({
      shininess: 60,
      specular: white,
      radius: 0.1,
      color: purple,
    }, () => {
      quat.setAxisAngle(angle, [1, 0, 0], 0.25*Math.PI)
      group({rotation, scale: 2}, ({scale}) => {
        const block = ({boundingBox}) => bottomY = scale[1]* boundingBox[0][1]
        switch (parseInt(time/3000*1000) % 6 + 1) {
          case 1: box(block); break
          case 2: heart(block); break
          case 3: circle(block); break
          case 4: hexagon(block); break
          case 5: triangle(block); break
          case 6: helix({rotation: angle}, block); break
        }
      })
    })
  })
})
