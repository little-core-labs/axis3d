import { CubeTexture, Texture } from '../../src/texture'
import { PerspectiveCamera } from '../../src/camera'
import { Shader } from '../../src/shader'

import {
  Material,
  Geometry,
  Context,
  Frame,
  Mesh
} from '../../src'

import PrimitiveCube from 'primitive-cube'
import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = new Context({pixelRatio: 1})

const rotation = quat.identity([])
const geometry = new Geometry({complex: PrimitiveCube(1, 1, 1)})
const texture = new Texture(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const mesh = new Mesh(ctx, {geometry})

const image = new Image(); image.src = '/assets/govball.jpg'
const video = document.createElement('video'); video.src = '/assets/video.mp4'
video.play()

const material = new Material(ctx, {
  fragmentShader({textureUniformName, texturePointer, textureData}) {
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
      #include <texture/2d>
      #include <varying/uv>
      #include <varying/read>
      #include <varying/data>
      uniform Texture2D ${textureUniformName};
      void main() {
        VaryingData data = ReadVaryingData();
        gl_FragColor = texture2D(${textureUniformName}.data, data.uv);
      }
      `
    }
  }
})

let data = video
let i = 0
setInterval(() => {
  if (0 == ++i % 2) { data = video }
  else { data = image }
}, 1000)

frame(({time}) => {
  quat.setAxisAngle(rotation, [1, 0, 0], 0.5*time)
  camera({rotation, position: [0, 0, 2]}, () => {
    texture({data: null}, () => {
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
})
