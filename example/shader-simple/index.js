'use strict'

import {
  PerspectiveCamera,
  BoxGeometry,
  Context,
  ShaderLib,
  Shader,
  Frame,
  MeshXAttributes,
  MeshX,
  Mesh,
} from '../../src'

import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = new Context()

const geometry = new BoxGeometry()
const shader = new Shader(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const stats = new Stats()
const box = new MeshX(ctx, {geometry})

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time}) {
  camera({position: [5, 5, -5]}, () => {
    shader({
      vertexShader:`
      #define GLSL_MESH_UNIFORMS_HAVE_CAMERA
      #define GLSL_MESH_UNIFORMS_HAVE_MESH

      #define GLSL_MESH_VERTEX_ATTRIBUTES_HAVE_POSITION
      #define GLSL_CAMERA_HAVE_PROJECTION
      #define GLSL_CAMERA_HAVE_VIEW

      #define GLSL_MESH_HAVE_MODEL

      #include <camera/camera>
      #include <mesh/mesh>

      #include <mesh/vertex/attributes>
      #include <mesh/uniforms>

      void main() {
        gl_Position = camera.projection * camera.view * mesh.model * vec4(position, 1.0);
      }
      `,

      fragmentShader: `
      void main() {
        gl_FragColor = vec4(0.2, 0.3, 0.4, 1.0);
      }
      `
    }, () => {
      box()
    })
  })
}
