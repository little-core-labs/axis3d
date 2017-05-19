'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  KeyboardInput,
  PlaneGeometry,
  FlatMaterial,
  MeshUniforms,
  MouseInput,
  TouchInput,
  Quaternion,
  Material,
  Texture,
  Context,
  Frame,
  Color,
  Mesh,
} from 'axis3d'

import quat from 'gl-quat'

///////////// start Web Audio API code /////////////
const audioCtx = new AudioContext()
const analyser = audioCtx.createAnalyser()
const sourceBuffer = audioCtx.createBufferSource()
const jsScriptNode = audioCtx.createScriptProcessor(512, 1, 1)
const bufferLength = analyser.frequencyBinCount
const frequencyDataArray = new Uint8Array(bufferLength)
const waveformDataArray = new Uint8Array(bufferLength)

const SHAPE = 16
analyser.smoothingTimeConstant = 0.21
analyser.fftSize = 1024 * SHAPE
analyser.smoothingTimeConstant = 0.59

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
      analyser.getByteFrequencyData(frequencyDataArray)
      // fill array with frequency data
      analyser.getByteTimeDomainData(waveformDataArray)
    }

    // play audio
    sourceBuffer.start(audioCtx.currentTime)
  })
}
request.send()
///////////// end Web Audio API code /////////////

///////////// start Axis3D code /////////////
const ctx = Context()

const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)
const rotation = Quaternion()
const fDataTexture = Texture(ctx)

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
  euler: [-0.5*Math.PI, 0, 0]
})


let geometry = PlaneGeometry({ segments: {x: 256, y: 1},
                               size: {x: 10, y: 1}
                            })

const plane = Mesh(ctx, {
  geometry: geometry,
  uniforms: Object.assign(new MeshUniforms(ctx), {
    fDataTexture(reglCtx, opts) {
      return reglCtx.texture(opts.fDataTextureArgs)
    },
    wDataTexture(reglCtx, opts) {
      return reglCtx.texture(opts.wDataTextureArgs)
    }
  }),
  vertexShaderTransform:
  `
  uniform sampler2D fDataTexture;
  uniform sampler2D wDataTexture;

  float lerp(float x, float y, float a) {
    return x * (1.0 - a) + y * a;
  }

  void transform () {
    float offsetX = texture2D(fDataTexture, uv).x;
    offsetX = lerp(gl_Position.x, gl_Position.x + (offsetX/1.0) + gl_Position.x, 0.701);

    float offsetY = texture2D(wDataTexture, uv).x;
    offsetY = lerp(gl_Position.y, gl_Position.y + (offsetY/1.0) + gl_Position.y, 0.701);

    gl_Position = vec4(offsetX, offsetY, gl_Position.zw);
  }
  `
})

const material = Material(ctx, {
  map: fDataTexture,
  uniforms: {
    fDataTexture(reglCtx, opts) {
      return reglCtx.texture(opts.dataTexture)
    },
    singleDataPoint(reglCtx, opts) {
      return opts.singleDataPoint
    },
  },
  fragmentShaderMain:
  `
  uniform float singleDataPoint;
  uniform sampler2D fDataTexture;

  void main() {
    GeometryContext geometry = getGeometryContext();

    float green = texture2D(fDataTexture, geometry.uv).g;

    gl_FragColor = vec4(singleDataPoint/256.0, green, 0.5, 1.0);
  }
  `
})
const angle = Quaternion()

frame(({time, cancel}) => {
  orbitCamera({ position: [0, 0, 5], target: [0, 0, 0] }, () => {
    material({
      cull: false,
      singleDataPoint: frequencyDataArray[100],
      fDataTexture: {data: frequencyDataArray,
                           width: 256,
                           height: 1
                    },
    }, () => {
      plane([{
        fDataTextureArgs: {data: frequencyDataArray,
                                 width: 256,
                                 height: 1
                          },
        wDataTextureArgs: {data: waveformDataArray,
                                 width: 256,
                                 height: 1
                          }
      }, {}])
    })
  })
})
