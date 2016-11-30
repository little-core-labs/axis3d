'use strict'

import VignetteBackground from 'axis3d/backgrounds/vignette'
import Context from 'axis3d/context'
import Camera from 'axis3d/camera'
import Plane from 'axis3d/mesh/plane'
import Frame from 'axis3d/frame'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import Box from 'axis3d/mesh/box'
import raf from 'raf'

const ctx = Context()
const box = Box(ctx)
const frame = Frame(ctx)
const camera = Camera(ctx, {position: [0, 0, -5]})
const background = VignetteBackground(ctx)

const count = 40
const color = [0, 0, 0, 1]
const rotation = [0, 0, 0, 1]
const positions = Array(count).fill(0).map((_, i) => vec3.random([], i + 4))

frame(({time}) => {
  quat.copy(rotation,
            quat.multiply([],
                          quat.setAxisAngle([], [0, 1, 0], +Math.cos(0.125*time)),
                          quat.setAxisAngle([], [1, 0, 0], -Math.sin(0.125*time))))

  camera({position: [10, 0, 0], rotation}, () => {
    background({
      reduction: -4*Math.cos(time),
      boost: 0.125*Math.sin(time),
      color: [ Math.sin(time) % 255, Math.cos(time) % 255, time % 255, 1 ]
    })

    for (let i = 0; i < count; ++i) {
      const position = positions[i]
      quat.setAxisAngle(rotation, [1, 0, 0], (i+1)*0.25*time)
      color[0] = 0.125*(i+1)*Math.sin(time) % 255
      color[1] = 0.125*(i+1)*Math.cos(time) % 255
      color[2] = 0.0625*i*time % 255
      box({rotation, position, color})
    }
  })
})