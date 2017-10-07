import { PerspectiveCamera } from '../../src/camera'
import { Shader } from '../../src/shader'

import {
  TextureShaderUniforms,
  Texture,
} from '../../src/texture'

import {
  Material,
  Geometry,
  Context,
  Entity,
  Frame,
  Mesh
} from '../../src'

import PrimitiveCube from 'primitive-cube'
import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = new Context({})
const stats = new Stats()

const rotation = quat.identity([])
const geometry = new Geometry({complex: PrimitiveCube(1, 1, 1)})
const texture = new Texture(ctx, {
  format: 'rgb',
  alignment: 4,
  colorSpace: 'browser'
})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const mesh = new Mesh(ctx, {geometry})

const image = new Image()
const video = document.createElement('video'); video.src = '/assets/video.mp4'
video.loop = true
video.play()

const material = Entity(ctx,
  new TextureShaderUniforms(ctx),
  new Material(ctx, {
    fragmentShader({textureUniformName, textureData}) {
      if (null == textureData) {
        return `
        #include <material/material>
        #include <material/uniforms>
        void main() {
          gl_FragColor = vec4(material.color, material.opacity);
        }
        `
      } else {
        return `
        #include <varying/uv>
        #include <varying/read>
        #include <varying/data>
        #include <texture/2d>
        #include <texture/uniforms>
        void main() {
          VaryingData data = ReadVaryingData();
          gl_FragColor = texture2D(${textureUniformName}, data.uv);
        }
        `
      }
    }
  }))

let data = image
let i = 0
setInterval(() => {
  if (0 == ++i % 2) { data = video }
  else { data = image }
}, 1000)

setTimeout(() => {
  image.src = '/assets/govball.jpg'
}, 200)

Object.assign(window, {texture, material, mesh})
ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

function scene({time}) {
  quat.setAxisAngle(rotation, [1, 0, 0], 0.5*time)
  camera({rotation, position: [0, 0, 2]}, () => {
    texture({}, (...args) => {
      material(() => {
        mesh({wireframe: true}, () => {
          texture({data}, () => {
            material({color: [0, 0.5, 0.5]}, () => {
              mesh({scale: 0.5})
            })
          })
        })
      })
    })
  })
}
