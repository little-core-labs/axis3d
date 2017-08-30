import 'fulltilt/dist/fulltilt'

import {
  TextureShaderUniforms,
  OrthographicCamera,
  PerspectiveCamera,
  ShaderAttributes,
  ShaderUniforms,
  FrameBuffer,
  Component,
  Material,
  Geometry,
  MaterialShader,
  Texture,
  Context,
  Camera,
  Frame,
  MeshShader,
  Mesh,
} from '../../src'

import PrimitivePlane from 'primitive-plane'
import PrimitiveCube from 'primitive-cube'

import quat from 'gl-quat'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'

import isSafari from 'is-safari'
import isIOS from 'is-ios'

import Gyronorm from 'gyronorm'

import {
  ARController,
  ARCameraParam,
} from 'jsartoolkit5'

window.WebVRConfig = {
  // Forces availability of VR mode, even for non-mobile devices.
  FORCE_ENABLE_VR: true,

  // Flag to disabled the UI in VR Mode.
  CARDBOARD_UI_DISABLED: false, // Default: false

  // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
  K_FILTER: 0.968, // Default: 0.98.

  // Flag to disable the instructions to rotate your device.
  ROTATE_INSTRUCTIONS_DISABLED: true, // Default: false.

  // How far into the future to predict during fast motion (in seconds).
  PREDICTION_TIME_S: 0.04, // Default: 0.040.

  // Flag to disable touch panner. In case you have your own touch controls.
  TOUCH_PANNER_DISABLED: true, // Default: true.

  // Enable yaw panning only, disabling roll and pitch. This can be useful
  // for panoramas with nothing interesting above or below.
  YAW_ONLY: false, // Default: false.

  // To disable keyboard and mouse controls, if you want to use your own
  // implementation.
  MOUSE_KEYBOARD_CONTROLS_DISABLED: true, // Default: false.

  // Prevent the polyfill from initializing immediately. Requires the app
  // to call InitializeWebVRPolyfill() before it can be used.
  DEFER_INITIALIZATION: false, // Default: false.

  // Enable the deprecated version of the API (navigator.getVRDevices).
  ENABLE_DEPRECATED_API: false, // Default: false.

  // Scales the recommended buffer size reported by WebVR, which can improve
  // performance.
  BUFFER_SCALE: 2.0, // Default: 0.5.

  // Allow VRDisplay.submitFrame to change gl bindings, which is more
  // efficient if the application code will re-bind its resources on the
  // next frame anyway. This has been seen to cause rendering glitches with
  // THREE.js.
  // Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
  // gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
  // and gl.TEXTURE_BINDING_2D for texture unit 0.
  DIRTY_SUBMIT_FRAME_BINDINGS: true // Default: false.

}

import 'webvr-polyfill'

const ctx = new Context()

ctx.on('error', (err) => console.error(err.stack || err))

const constraints = {
  audio: false,
  video: {facingMode: 'environment'}
}
const video = document.createElement('video')

const framebuffer = new FrameBuffer(ctx)
const texture = new Texture(ctx, {flipY: true, format: 'rgb'})
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const mesh = new Mesh(ctx, {geometry: new PrimitiveCube(1, 1, 1)})

const glsl = {
  ['ar/webcam/fragment']:`
  #include <texture/2d>
  #include <texture/uniforms>
  #include <varying/position>
  #include <varying/uv>
  #include <varying/read>
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform
  ${MaterialShader.createFragmentShader({uniformName: 'material'})}
  uniform bool isFacingBack;
  void Transform(inout vec4 fragColor, inout VaryingData data) {
    vec2 uv = data.uv;
    if (!isFacingBack) {
      uv.x = 1.0 - uv.x;
    }
    fragColor = texture2D(GLSL_TEXTURE_2D_VARIABLE.data, uv);
    fragColor.a = 1.0;
  }
  `,

  ['ar/webcam/vertex']:`
  #define GLSL_VERTEX_MAIN_TRANSFORM Transform
  ${MeshShader.createVertexShader({uniformName: 'mesh'})}
  void Transform(inout vec4 vertexPosition, inout VaryingData data) {
  }
  `
}

const surface = Component.compose(
  new Camera(ctx),
  new ShaderUniforms(ctx, {isFacingBack: () => isFacingBack}),
  new TextureShaderUniforms(ctx),
  new Material(ctx, {glsl, depth: {enable: false}, fragmentShader: `#include "ar/webcam/fragment"`}),
  new Mesh(ctx, {
    glsl,
    geometry: new PrimitivePlane(2, 2),
    vertexShader: `#include "ar/webcam/vertex"`,
  })
)

//video.src = '/assets/video.mp4'; video.play()
ctx.domElement.ontouchend = ctx.domElement.onmousedown = () => {
  //getUserMedia()
}

const vrDisplays = []
navigator.getVRDisplays()
  .then((displays) => {
    Object.assign(vrDisplays, displays)
  })
  .catch((err) => ctx.emit('error', err))

let isFacingBack = false
let gotUserMedia = false

function getUserMedia() {
  if (gotUserMedia) { return false }
  gotUserMedia = true
  navigator.mediaDevices
    .enumerateDevices()
    .then(ondevices)
    .then(onsuccess)
    .catch((err) => ctx.emit('error', err))
  function ondevices(devices) {
    console.log(devices);
    for (const device of devices) {
      if ('videoinput' == device.kind) {
        constraints.video.sourceId = device.deviceId
        if (device.label.indexOf('facing back') > -1) {
          isFacingBack = true
          break
        }
      }
    }

    return navigator.mediaDevices.getUserMedia(constraints)
  }
}

let arController = null
let arCameraParam = null

function onsuccess(stream) {
  console.log('got cam');
  arCameraParam = new ARCameraParam('/Data/camera_para.dat')
  arCameraParam.onload = () => {
    video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata = () => {
      if (arController) { return }
      arController = new ARController(video.videoWidth, video.videoHeight, arCameraParam)
      arController.debugSetup()
      arController.image = video
      if (video.videoWidth < video.videoHeight) {
        arController.orientation = 'portrait';
        arController.videoWidth = video.videoHeight;
        arController.videoHeight = video.videoWidth;
      } else {
        arController.orientation = 'landscape';
        arController.videoWidth = video.videoWidth;
        arController.videoHeight = video.videoHeight;
      }
    }
  }
}

const markerMatrix = new Float64Array(12)
mat4.identity(markerMatrix, markerMatrix)

frame(() => {
  if (arController) {
    if (video.videoWidth && video.videoHeight) {
      if (video.videoWidth < video.videoHeight) {
        arController.orientation = 'portrait';
        arController.videoWidth = video.videoHeight;
        arController.videoHeight = video.videoWidth;
      } else {
        arController.orientation = 'landscape';
        arController.videoWidth = video.videoWidth;
        arController.videoHeight = video.videoHeight;
      }
    }

    const markerNum = arController.getMarkerNum();
    if (markerNum) {
      console.log(markerNum);
      arController.getTransMatSquare(
        0 /* Marker index */,
        1 /* Marker width */,
        markerMatrix);
      console.log(markerMatrix);
    }
    //arController.debugDraw();
  }
})

setInterval(() => {
  if (arController) {
    arController.process(video)
    arController.detectMarker(video);
  }
}, 1000)

const vrFrameData = new VRFrameData()
const rotation = quat.identity([])
const position = [0, 0, 0]

const earthRadius = 6367449
const gyro = new Gyronorm()

const watchId = navigator.geolocation.watchPosition(onposition, (err) => ctx.emit('error', err), {
  enableHighAccuracy: true,
  timeout: 0,
  maximumAge: 0
})

function transformCartesian(radius, theta, phi) {
  const x = radius*Math.sin(phi)*Math.cos(theta)
  const y = radius*Math.sin(phi)*Math.sin(theta)
  const z = radius*Math.cos(phi)
  return [x, y, z]
}

/*window.ondevicemotion = ({acceleration, accelerationIncludingGravity}) => {
  let {x, y, z} = accelerationIncludingGravity
  if (isSafari) {
    x *= -1
    y *= -1
  }

  const vector = [x, y, z]
  console.log(vector);
}*/

gyro
  .init({
    frequency: 100,
    orientationBase: Gyronorm.WORLD,
    decimalCount: 1,
    screenAdjusted: true
  })
  .then(() => {
    gyro.normalizeGravity(true)
    gyro.setHeadDirection()
    gyro.start(({dm}) => {
      let {x, y, z} = dm
      const constraint = (v, f) => parseFloat((v < 0 ? v + f : (v > 0 ? v - f : v)).toPrecision(1))
      z = (Math.round(z)/10)*10
      x = constraint(x, 0.0286)
      y = constraint(y, 0.021)
      //z = constraint(z, 0.03)
      const vector = [0, 0, z]
      vec3.lerp(position, position, vec3.add([], position, vector), 0.01)
      console.log(position);
    })
  })
  .catch((err) => ctx.emit('error'))

let previousPoint = null
let currentPoint = null
function onposition({coords}) {
  const radians = (d) => d*Math.PI/180
  const r = earthRadius
  const theta = radians(coords.longitude)
  const phi = radians(coords.latitude)
  const point = transformCartesian(r, theta, phi)
  if (null == previousPoint) {
    previousPoint = point.slice()
    currentPoint = point.slice()
  } else {
    previousPoint = currentPoint.slice()
    vec3.subtract(position, point, currentPoint)
    currentPoint = point.slice()
  }
  console.log(position);
}

frame(() => {
  if (vrDisplays.length) {
    vrDisplays[0].getFrameData(vrFrameData)
    const pose = vrDisplays[0].getPose()
    if (pose && pose.orientation) {
      quat.conjugate(rotation, pose.orientation)
      if (!rotation[0]) rotation[0] = 0
      if (!rotation[1]) rotation[1] = 0
      if (!rotation[2]) rotation[2] = 0
      if (rotation[3] != rotation[3]) rotation[3] = 1
    }
  }
})

frame(() => {
  texture({data: video}, () => { surface() })
  //camera({position: [0, 0, 5], rotation}, () => {
  camera({position, rotation}, () => {
    //mesh({transform: markerMatrix})
    mesh()
  })
})
