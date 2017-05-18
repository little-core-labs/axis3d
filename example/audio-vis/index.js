'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
  ExtrudeGeometry,
  SphereGeometry,
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

///////////// Web Audio Api /////////////
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
      analyser.getByteTimeDomainData(waveformDataArray)
      // console.log(frequencyDataArray.length / 64)
      // console.log(analyser.frequencyBinCount / 8)
    }

    // play audio
    sourceBuffer.start(audioCtx.currentTime)
  })
}
request.send()
///////////// Web Audio Api /////////////

const ctx = Context()

const camera = PerspectiveCamera(ctx)
const frame = Frame(ctx)
const rotation = Quaternion()

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
  // euler: [0, 0.5*Math.PI, 0]
})

const dataTexture = Texture(ctx)

let geo = PlaneGeometry({segments: {x: 256, y: 1}, size: {x: 10, y: 1}})

const sphere = Mesh(ctx, {
  geometry: geo,
  uniforms: Object.assign(new MeshUniforms(ctx), {
    dataTexture(reglCtx, o) {
      return reglCtx.texture(o.dataTextureArgs)
    },
    dataTexture2(reglCtx, o) {
      return reglCtx.texture(o.dataTextureArgs2)
    }
  }),
  vertexShaderTransform:
  `
  uniform sampler2D dataTexture;
  uniform sampler2D dataTexture2;

  float lerp(float x, float y, float a) {
    return x * (1.0 - a) + y * a;
  }
  void transform () {
    float offsetX = texture2D(dataTexture, uv).x;
    offsetX = lerp(gl_Position.x, gl_Position.x + (offsetX/1.0) + gl_Position.x, 0.701);

    float offsetY = texture2D(dataTexture2, uv).x;
    offsetY = lerp(gl_Position.y, gl_Position.y + (offsetY/1.0) + gl_Position.y, 0.701);

    gl_Position = vec4(offsetX, offsetY, gl_Position.zw);
  }
  `
})

const material = Material(ctx, {
  // texture needs to be defined before uniforms
  map: dataTexture,
  uniforms: {
    dataTexture(reglCtx, o) {
      return reglCtx.texture(o.dataTexture)
    },
    dArray(reglCtx, opts) {
      return opts.dArray
    },
  },
  fragmentShaderMain:
  `
  uniform float dArray;
  uniform sampler2D dataTexture;
  void main() {
    GeometryContext geometry = getGeometryContext();

    float blue = texture2D(dataTexture, geometry.uv).b;
    float green = texture2D(dataTexture, geometry.uv).g;
    float red = texture2D(dataTexture, geometry.uv).r;

    // gl_FragColor = vec4(red, green, blue, 1.0);
    gl_FragColor = vec4(dArray/256.0, green, 0.5, 1.0);
  }
  `
})
const angle = Quaternion()

frame(({time, cancel}) => {
  orbitCamera({ position: [0, 0, 3], target: [0, 0, 0] }, () => {
    quat.setAxisAngle(angle, [0, 1, 0], 0.25)
    material({
      cull: false,
      dArray: frequencyDataArray[100],
      dataTexture: {data:  frequencyDataArray,
                         width: 256,
                         height: 1
                  },
    }, () => {
      sphere([{
        dataTextureArgs: {data:  frequencyDataArray,
                         width: 256,
                         height: 1
                  },
        dataTextureArgs2: {data:  frequencyDataArray,
                         width: 256,
                         height: 1
                  }
      }, {}])
    })
  })
})
