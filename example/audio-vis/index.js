'use strict'

import {
  OrbitCameraController
} from '../../extras/controller'

import {
  PerspectiveCamera,
  OrientationInput,
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
  euler: [0, 0.5*Math.PI, 0]
})

const image = new Image()
image.src = 'assets/govball.jpg'
const texture = Texture(ctx, {map: image})
const rex = Texture(ctx)

const sphere = Mesh(ctx, {
  geometry: PlaneGeometry({segments: {x: 16, y: 116}}),
  uniforms: Object.assign(new MeshUniforms(ctx), {
    tex(r, o) {
      return r.texture(r.textureData)
    },
    rex(r, o) {
      return r.texture(o.rexArgs)
    }
  }),
  map: texture,
  vertexShaderTransform:
  `
  uniform sampler2D tex;
  uniform sampler2D rex;

  float lerp(float x, float y, float a) {
    return x * (1.0 - a) + y * a;
  }

  void transform () {
    float xoffset = texture2D(rex, uv).x;
    xoffset = lerp(2.0 * xoffset, gl_Position.x, 0.0000001);

    float yoffset = texture2D(rex, uv).y;
    yoffset = lerp(1.0 * yoffset, gl_Position.y, 0.0000001);

    gl_Position = vec4(gl_Position.x * (5.0 + xoffset), gl_Position.y + 2.0 * yoffset, gl_Position.zw);
  }
  `
})

const material = Material(ctx, {
  // texture needs to be defined before uniforms
  map: texture,
  uniforms: {
    tex(r, o) {
      return r.texture(r.textureData)
    },

    dArray(reglCtx, opts) {
      return opts.dArray
    },
  },
  fragmentShaderMain:
  `
  uniform float dArray;
  uniform sampler2D tex;
  void main() {
    GeometryContext geometry = getGeometryContext();

    float green = texture2D(tex, geometry.uv).g;

    gl_FragColor = vec4(dArray/256.0, green, 0.5, 1.0);
  }
  `
})

texture({data: image})

frame(({time, cancel}) => {
  orbitCamera({ position: [0, 2, 4], target: [0, 1, 0] }, () => {
    material({
      cull: false,
      dArray: dataArray[100],
      tex: texture,
    }, () => {
      sphere({
        tex: texture,
        rexArgs: {data:  dataArray,
                         width: 16,
                         height: 16
                  }
      })
    })
  })
})
