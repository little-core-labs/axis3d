'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  MaterialUniforms,
  DirectionalLight,
  SphereGeometry,
  LambertMaterial,
  PhongMaterial,
  KeyboardInput,
  PlaneGeometry,
  AmbientLight,
  FlatMaterial,
  MeshUniforms,
  BoxGeometry,
  CubeTexture,
  TouchInput,
  MouseInput,
  Material,
  Geometry,
  Context,
  Texture,
  Frame,
  Mesh,
} from '../../src'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import stanfordBunny from 'bunny'

const ctx = new Context()

const frame = new Frame(ctx)
const camera = new PerspectiveCamera(ctx)

const envTexture = new Texture(ctx)
const envImg = new Image()
envImg.src = 'assets/govball.jpg'
envImg.onload = () => envTexture({data: envImg})

const texture = new Texture(ctx)
const img = new Image()
img.src = 'assets/smsq2.jpg'
img.onload = () => texture({data: img})

const cubeTexture = new CubeTexture(ctx)

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

cubeTexture({data: [
  ft,
  bk,
  up,
  dn,
  rt,
  lf,
]})

// inputs
const orientation = new OrientationInput(ctx)
const keyboard = new KeyboardInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)

// orbit camera controls
const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = new OrbitCameraController(ctx, {
  camera, inputs,
  invert: true,
  interpolationFactor: 0.1,
})

const directional = new DirectionalLight(ctx)
const ambient = new AmbientLight(ctx)


/////////////////////
/////////////////////
/*const reflectiveMaterial = new PhongMaterial(ctx, {
  envmap: envTexture,
  map: texture,
  color: [1.0, 1.0, 1.0, 1.0]
})

const bunny = new Mesh(ctx, {
  geometry: new BoxGeometry(),
})


const backgroundMaterial = new FlatMaterial(ctx, {
  envmap: cubeTexture
})

const background = new Mesh(ctx, {
  geometry: new BoxGeometry()
})*/

void function (){
  const mesh = new Mesh(ctx, {geometry: new BoxGeometry()})
  const material = new LambertMaterial(ctx, {envmap: cubeTexture})
  const env = (() => {
    const mesh = new Mesh(ctx, {geometry: new BoxGeometry()})
    const material = new FlatMaterial(ctx, {
      map: cubeTexture, cull: {enable: false}
    })
    return (...args) => material(() => mesh(...args))
  })()

  frame(() => {
    directional({position: [5, 5, 5]})
    ambient({ambient: 1.1})
  })

  frame(() => {
    orbitCamera({position: [0, 0, 5], target: [0, 0, 0]}, ({target}) => {
      env({scale: 10}, () => {
        material(() => { mesh({scale: 0.1, position: target}) })
      })
    })
  })
}()

/*
frame(() => {
  orbitCamera({position: [-0.2, 0, 0], target: [0, 0, 0]}, () => {

    directional({
      color: [1.0, 1.0, 1.0, 1.0],
      position: [0, 1, -5],
    })
    ambient({
      color: [1.0, 1.0, 1.0, 1.0],
      ambient: 1.1
    })

    backgroundMaterial({cull: false}, () => {
      background({scale: [1, -1, 1]})
    })

    reflectiveMaterial({
      cull: false,
      shininess: 180,
      specular: [1.0, 0.790, 0.990, 1.0],
      emissive: [0.0, 0.0, 0.0, 1.0],
    }, () => {
      bunny({
        scale: 0.311,
        position: [0, -0.0, 0]
      })
    })
  })
})*/
