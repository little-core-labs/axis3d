'use strict'

import {
  PerspectiveCamera,
  SphereGeometry,
  GeometryBuffer,
  FlatMaterial,
  MeshUniforms,
  Quaternion,
  Material,
  Texture,
  Context,
  Frame,
  Color,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

///////////// Web Audio Api /////////////
const audioCtx = new AudioContext()
const analyser = audioCtx.createAnalyser()
const sourceBuffer = audioCtx.createBufferSource()
const jsScriptNode = audioCtx.createScriptProcessor(512, 1, 1)
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

analyser.smoothingTimeConstant = 0.1
analyser.fftSize = 512

sourceBuffer.connect(analyser)
sourceBuffer.connect(audioCtx.destination)

jsScriptNode.connect(audioCtx.destination)

const request = new XMLHttpRequest()
request.open('GET', 'assets/audio.mp3', true)
request.responseType = 'arraybuffer'
request.onload = () => {

  audioCtx.decodeAudioData(request.response, (buffer) => {
    sourceBuffer.buffer = buffer

    jsScriptNode.onaudioprocess = (e) => {
      // fill array with frequency data
      analyser.getByteFrequencyData(dataArray)
    }

    // play audio
    sourceBuffer.start(audioCtx.currentTime)
  })
}
request.send()
///////////// Web Audio Api /////////////


const ctx = Context()

const fbo = GeometryBuffer(ctx)
// fbo(dataArray)()

const image = new Image()
image.src = 'assets/govball.jpg'
const texture = Texture(ctx, {map: image})

const sphere = Mesh(ctx, {
  geometry: SphereGeometry(),
  map: texture,
  uniforms: Object.assign(new MeshUniforms(ctx), {
    tex(r, o) {
      return r.texture(r.textureData)
    },
    vertArray(reglCtx, opts) {
      return opts.vertArray
    }
  }),
  framebuffer: {},
  ///////// VERTEX //////////
  vertexShaderTransform:
  `
  uniform float vertArray;
  uniform sampler2D tex;

  // float lerp() {
  // }

  void transform () {
    float offset = texture2D(tex, uv).y + (vertArray/256.0);
    offset = (offset - 0.5) * 2.0;
    gl_Position = vec4(gl_Position.x + 1.0, gl_Position.y + offset/8.0, gl_Position.yzw);
  }
  `
})

const material = Material(ctx, {
  uniforms: {
    tex(r, o) {
      return r.texture(r.textureData)
    },
    dArray(reglCtx, opts) {
      return opts.dArray
    },
  },
  map: texture,
  ///////// FRAGMENT //////////
  fragmentShaderMain:
  `
  uniform float dArray;
  uniform sampler2D tex;
  void main() {
    GeometryContext geometry = getGeometryContext();

    float green = texture2D(tex, geometry.uv).x;

    gl_FragColor = vec4(dArray/256.0, green, 0.5, 1.0);
  }
  `
})

texture({data: image})

const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)
const rotation = Quaternion()

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], -0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation, position: [0, 0, 5]}, () => {
    material({
      dArray: dataArray[100],
      tex: texture,
    }, () => {
      sphere({
        vertArray: dataArray[100],
        texData: fbo(dataArray)(),
        tex: texture,
      })
    })
  })
})
