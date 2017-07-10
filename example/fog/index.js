'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  SphereGeometry,
  PhongMaterial,
  FlatMaterial,
  CubeTexture,
  Quaternion,
  Texture,
  Context,
  Frame,
  Color,
  LambertMaterial,
  Mesh,
  Fog,
} from '../../src'

import quat from 'gl-quat'

const ctx = new Context()

const fog = new Fog(ctx, {
  color: [0.5, 0.5, 0.5, 1.0],
  amount: 0.025
})

const image = new Image()
image.src = 'assets/texture.jpg'

const texture = new Texture(ctx)

const camera = new PerspectiveCamera(ctx)
const sphere = new Mesh(ctx, { geometry: new SphereGeometry() })
const frame = new Frame(ctx)
const light = new DirectionalLight(ctx)
const material = new LambertMaterial(ctx, {fog: fog, map: texture})
const rotation = new Quaternion()

const envCubeTexture = new CubeTexture(ctx)
// const envMaterial = new LambertMaterial(ctx, {fog: fog, envmap: envCubeTexture})
const envMaterial = new LambertMaterial(ctx, {envmap: envCubeTexture, color: [1.0,1.0,1.0,1.0]})
///// Environment Cube Texture /////
const bk = new Image()
bk.src = 'assets/criminal-impact_bk.jpg'
const dn = new Image()
dn.src = 'assets/criminal-impact_dn.jpg'
const ft = new Image()
ft.src = 'assets/criminal-impact_ft.jpg'
const lf = new Image()
lf.src = 'assets/criminal-impact_lf.jpg'
const rt = new Image()
rt.src = 'assets/criminal-impact_rt.jpg'
const up = new Image()
up.src = 'assets/criminal-impact_up.jpg'

envCubeTexture({data: [
  ft,
  bk,
  up,
  dn,
  rt,
  lf,
]})

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.0)
  const y = angle([0, 1, 0], Math.sin(0.08*time) )
  const z = angle([0, 0, 1], -0.10*time)
  // quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation, position: [0, 2, 8]}, () => {

    // light({intensity: 0.8, position: [0, 0, 51], ambient: 0.01})
    light({intensity: 0.8, position: [0, 0, 10], ambient: 0.01})
    texture({data: image})
    fog()

    material({
      specular: new Color('dim gray'),
    }, () => {
      sphere({})
      sphere({position: [2,0,Math.sin(0.8*time)*5-5]})
      sphere({position: [-2,0,-6]})
      sphere({position: [0,0,-10]})
    })
    envMaterial({cull: false}, () => {
      sphere({scale: 4.5})
    })
  })
})
