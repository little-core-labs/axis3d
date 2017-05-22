'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  MaterialUniforms,
  SphereGeometry,
  KeyboardInput,
  PlaneGeometry,
  FlatMaterial,
  MeshUniforms,
  TouchInput,
  MouseInput,
  Material,
  Texture,
  Context,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import stanfordBunny from 'bunny'

const ctx = Context()

const frame = Frame(ctx)
const camera = PerspectiveCamera(ctx)

const material = FlatMaterial(ctx)

const texture = Texture(ctx)
const govBall = new Image()
govBall.src = 'assets/govball.jpg'
texture({data: govBall})

// inputs
const orientation = OrientationInput(ctx)
const keyboard = KeyboardInput(ctx)
const mouse = MouseInput(ctx)
const touch = TouchInput(ctx)

// orbit camera controls
const inputs = { orientation, keyboard, touch, mouse }
const orbitCamera = OrbitCameraController(ctx, {
  camera, inputs,
  invert: true,
  interpolationFactor: 0.1,
})

let i = 0
const reflectMaterial = Material(ctx, {
  map: texture,
  uniforms: {
    envmap(reglCtx, opts) {
      return !i++ ? reglCtx.texture(reglCtx.textureData) : reglCtx.texture
    },
    invertedView(reglCtx, opts) {
      return mat4.invert([], reglCtx.view)
    }
  },
  fragmentShaderMain:
  `
  uniform sampler2D envmap;
  varying vec3 vReflectDir;

  vec4 lookupEnv(vec3 dir) {
    float PI = 3.14;
    float lat = atan(dir.z, dir.x);
    float lon = acos(dir.y / length(dir));
    vec2 envLoc = vec2(0.5 + lat / (2.0 * PI), lon / PI);

    return texture2D(envmap, envLoc);
  }

  void main() {
    GeometryContext geometry = getGeometryContext();

    gl_FragColor = lookupEnv(vReflectDir);
  }
  `
})

const bunny = Mesh(ctx, {
  geometry: stanfordBunny,
  uniforms: Object.assign(new MeshUniforms(ctx), {
    invertedView(reglCtx, opts) {
      return mat4.invert([], reglCtx.view)
    }
  }),
  vertexShaderTransform:
  `
  varying vec3 vReflectDir;
  uniform mat4 invertedView;

  void transform() {
    vec3 iv = invertedView[3].xyz / invertedView[3].w;
    vec3 eye = normalize(gl_Position.xyz - iv);

    vReflectDir = reflect(eye, normal);
  }
  `
})

const bgMaterial = FlatMaterial(ctx, {map: texture})
const background = Mesh(ctx, { geometry: SphereGeometry(ctx)})

frame(() => {
  orbitCamera({position: [-0.2,0,0], target: [0,0,0]}, () => {
    bgMaterial({cull: false}, () => {
      background({scale: [1, -1, 1] }, () => {
      })
        reflectMaterial({cull: false} , () => {
          bunny({scale: 0.1, position: [0, -0.002, 0]})
        })
    })
  })
})