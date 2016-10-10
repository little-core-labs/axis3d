'use strict';

import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Box from 'axis3d/mesh/box'
import Sphere from 'axis3d/mesh/sphere'
import Frame from 'axis3d/frame'
import Fullscreen from 'axis3d/fullscreen'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import raf from 'raf'

const ctx = Context()
const camera = Camera(ctx, {position: [0, 0, -5]})
const frame = Frame(ctx)

const box = Box(ctx)
const rotation = [0, 0, 0, 1]
const fullscreen = Fullscreen(ctx);
let isFullscreen = false;

ctx.domElement.addEventListener('click', (e) => {
  isFullscreen = !isFullscreen;
  fullscreen({enabled: isFullscreen})
})

frame(({time}) => {
  camera(() => {
    quat.setAxisAngle(rotation, [0, 1, 0], time)
    box({rotation: rotation})
  })
})
