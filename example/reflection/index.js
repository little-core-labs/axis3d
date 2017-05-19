'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

const bunny = require('bunny')

import {
  OrientationInput,
  MouseInput,
  KeyboardInput,
  TouchInput,
  PerspectiveCamera,
  SphereGeometry,
  PlaneGeometry,
  FlatMaterial,
  MeshUniforms,
  Material,
  Texture,
  Context,
  Frame,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'

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
  // euler: [-0.5*Math.PI, 0, 0]
})

const reflectMaterial = Material(ctx, {
  map: texture,
  uniforms: {
    envmap(reglCtx, opts) {
      return reglCtx.texture(reglCtx.textureData)
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
    // vec4 derp = vec4(1.0,1.0,0.5,0.01);
    gl_FragColor = lookupEnv(vReflectDir);
  }
  `
})

const background = Mesh(ctx, {
  // geometry: {
  //   position: [
  //     -4, -4,
  //     -4, 4,
  //     8, 0]
  // },

  // attributes: {
  //   position: [
  //     -4, -4,
  //     -4, 4,
  //     8, 0]
  // },
  depth: {
    mask: false,
    enable: false
  },


  geometry: PlaneGeometry(),
  vertexShaderTransform:
  `
  varying vec3 vReflectDir;

  void transform() {
    vReflectDir = (camera.view * vec4(gl_Position.xy, 1, 0)).xyz;

    gl_Position = vec4(gl_Position.xy, 0, 1.0);
  }
  `,
})

const sphere = Mesh(ctx, {
  depth: {
    mask: false,
    enable: false
  },
  geometry: bunny,
  // geometry: SphereGeometry(),
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


frame(() => {
  orbitCamera({position: [0,0,15]}, () => {
    reflectMaterial({} , () => {
      // background({cull: false})
      sphere({position: [0,0,0]})
    })
  })
})