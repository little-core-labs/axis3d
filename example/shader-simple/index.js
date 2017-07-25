'use strict'

import {
  PerspectiveCamera,
  Geometry,
  BoxGeometry,
  Context,
  ShaderLib,
  Shader,
  Frame,
  MaterialX,
  MeshXAttributes,
  MeshX,
  Mesh,
} from '../../src'

import glsl from 'glslify'
import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import Bunny from 'bunny'

const ctx = new Context()

const material = new MaterialX(ctx)
//const geometry = new BoxGeometry()
const geometry = new Geometry({complex: Bunny})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const stats = new Stats()
const box = new MeshX(ctx, {geometry})

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time, cancel}) {
  camera({position: [5, 5, 5]}, () => {
    material(() => {
      box({scale: 0.8}, ({vertexShader, fragmentShader}) => {
        cancel()
      })
    })
  })
}
