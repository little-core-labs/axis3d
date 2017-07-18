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
const material = new Material(ctx, {
  fragmentShader: `
    void main() { gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); }
  `
})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const box = new Mesh(ctx, {
  geometry: new BoxGeometry(),
  vertexShader: `
  attribute vec3 position;
  struct Mesh {
    mat4 model;
    mat3 modelNormal;
  };
  struct Camera {
    mat4 projection;
    float aspect;
    mat4 view;
    vec3 eye;
  };
  void main() {
    gl_Position = vec4(position, 1.0);
  }
  `
})

const rotation = new Quaternion()
const position = new Vector3(0, 0, 5)
const angle = new Quaternion()
const color = new Color('blue')
const stats = new Stats()

ready(() => document.body.appendChild(stats.dom))

console.log(frame instanceof Command)
console.log(typeOf(frame), instanceOf(frame, Command))

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
