'use strict'

import {
  PerspectiveCamera,
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

const ctx = new Context()

const material = new MaterialX(ctx)
const geometry = new BoxGeometry()
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const stats = new Stats()
const box = new MeshX(ctx, {geometry})

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

const vertexShader = new Shader(ctx, {

})

const fragmentShader = new Shader(ctx, {
})

function scene({time}) {
  camera({position: [5, 5, -5]}, () => {
    material(() => {
      box()
    })
  })
}
