'use strict'


import {
  PerspectiveCamera,
  FlatMaterial,
  Material,
  BoxGeometry,
  Quaternion,
  Command,
  Context,
  Vector3,
  Color,
  Frame,
  Mesh,
} from '../../src'

import { typeOf, instanceOf } from '../../src/core/types'

import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'

const ctx = new Context()
const material = new FlatMaterial(ctx, {
  //fragmentShader: ` void main() { gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); } `
})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const box = new Mesh(ctx, {
  geometry: new BoxGeometry(),
  vertexShader: `
  precision mediump float;
  attribute vec3 position;
  struct Camera {
    mat4 invertedView;
    mat4 projection;
    float aspect;
    mat4 view;
    vec3 eye;
  };
  struct Mesh {
    vec4 rotation;
    vec3 position;
    vec3 scale;
    mat4 model;
    mat3 modelNormal;
  };

  uniform Mesh mesh;
  uniform Camera camera;
  varying vec3 vposition;
  varying vec3 vnormal;
  varying vec2 vuv;
  varying vec3 vLocalPosition;
  varying vec3 vLocalNormal;
  void main() {
    gl_Position =
      camera.projection
    * camera.view
    * mesh.model
    * vec4(position, 1.0);
    vposition = (mesh.model * vec4(position, 1.0)).xyz;
    vnormal = normalize((mesh.model * vec4(position, 1.0)).xyz);
    vuv = position.xy;
    vLocalPosition = position;
    vLocalNormal = position;
  }
  `
})

const rotation = new Quaternion()
const position = new Vector3(0, 0, 5)
const angle = new Quaternion()
const color = new Color('blue')
const stats = new Stats()

ready(() => document.body.appendChild(stats.dom))

frame(() => stats.begin())

frame(({time}) => {
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.5)
  camera({rotation, position}, () => {
    material({color}, () => {
      box({wireframe: true})
    })
  })
})

frame(() => stats.end())
