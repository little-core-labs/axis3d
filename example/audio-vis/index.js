'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  SphereGeometry,
  Quaternion,
  Material,
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
const sphere = Mesh(ctx, { geometry: SphereGeometry() })
const frame = Frame(ctx)
const light = DirectionalLight(ctx)
const material = Material(ctx, {
  uniforms: {
    dArray(reglCtx, opts) { return opts.dArray }
  },
  fragmentShaderMain:
  `
  uniform float dArray;
  void main() {
    GeometryContext geometry = getGeometryContext();

    gl_FragColor = vec4(dArray/256.0,0.3,0.5,1.0);
  }
  `
})
const rotation = Quaternion()

const image = new Image()
image.src = 'assets/texture.jpg'

frame(({time, cancel}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const angle = (...args) => quat.setAxisAngle([], ...args)
  const x = angle([1, 0, 0], 0.05*time)
  const y = angle([0, 1, 0], 0.08*time)
  const z = angle([0, 0, 1], -0.10*time)
  quat.slerp(rotation, rotation, multiply(multiply(x, y), z), 0.5)
  camera({rotation, position: [0, 0, 5]}, () => {
    light({intensity: 0.8, position: [0, 0, 10], ambient: 0.01})
    material({
      dArray: dataArray[100]
    }, () => {
      sphere({})
    })
  })
})
