'use strict'

import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import Box from 'axis3d/mesh/box'
import raf from 'raf'

const ctx = Context()
const frame = Frame(ctx)
const camera = Camera(ctx, {position: [0, 0, -5]})

const box = Box(ctx)
const count = 40
const color = [0, 0, 0, 1]
const rotation = [0, 0, 0, 1]
const positions = Array(count).fill(0).map((_, i) => vec3.random([], i))

frame(({time}) => {
  quat.copy(rotation,
            quat.multiply([],
                          quat.setAxisAngle([], [0, 1, 0], +Math.cos(0.125*time)),
                          quat.setAxisAngle([], [1, 0, 0], -Math.sin(0.125*time))))

  camera({position: [10, 0, 0], rotation}, () => {
    for (let i = 0; i < count; ++i) {
      const position = positions[i]
      quat.setAxisAngle(rotation, [1, 0, 0], (i+1)*0.25*time)
      color[0] = (Math.sin(time)*i*.125) % 255
      color[1] = (Math.cos(time)*i*.0125) % 255
      color[2] = time * 0.125 % 255
      box({rotation, position, color})
    }
  })
})
