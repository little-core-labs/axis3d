'use strict';

import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Box from 'axis3d/mesh/box'
import Sphere from 'axis3d/mesh/sphere'
import Frame from 'axis3d/frame'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import raf from 'raf'

const ctx = Context()
const camera = Camera(ctx, {position: [0, 0, -5]})
const frame = Frame(ctx)

const box = Box(ctx)
const rotation = [0, 0, 0, 1]




frame(({time}) => {
  //     change rotation, on x & y axis, not z, 
  quat.setAxisAngle(rotation, [1, 1, 0], 0.5*Math.sin(time))

  camera(() => {

    quat.setAxisAngle(rotation, [1, 0, 0], time)

        
    box({rotation: rotation})
  })
})  