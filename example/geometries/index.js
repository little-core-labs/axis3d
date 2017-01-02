'use strict'

import {
  Material,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  TriangleGeometry,
  CapsuleGeometry,
  SphereGeometry,
  PlaneGeometry,
  TorusGeometry,
  BoxGeometry,
} from 'axis3d/geometry'

import quat from 'gl-quat'
import vec3 from 'gl-vec3'

const ctx = Context()

const rotation = [0, 0, 0, 1]
const material = Material(ctx)
const camera = Camera(ctx, {position: [5, 8, 12]})
const frame = Frame(ctx)
const angle = [0, 0, 0, 1]

const triangle = Mesh(ctx, { geometry: TriangleGeometry() })
const capsule = Mesh(ctx, { geometry: CapsuleGeometry() })
const sphere = Mesh(ctx, { geometry: SphereGeometry() })
const plane = Mesh(ctx, { geometry: PlaneGeometry({ segments: 16, size: 30 }) })
const box = Mesh(ctx, { geometry: BoxGeometry() })
const torus = Mesh(ctx, { geometry: TorusGeometry() })

frame(({time}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  quat.setAxisAngle(angle, [0, 1, 0], 0.5*time)
  quat.slerp(rotation, rotation, angle, 0.01)

  camera({rotation}, () => {
    material({color: [0.125, 0.125, 0.75, 1], opacity: 1}, () => {
      plane({
        wireframe: true,
        rotation: quat.setAxisAngle([], [1, 0, 0], 0.5*Math.PI)
      })

      torus({
        position: [0, 5, 0],
        scale: [2, 2, 2],
        rotation:
          multiply(
            quat.setAxisAngle([], [1, 0, 0], 0.5*time),
            quat.setAxisAngle([], [0, 0, 1], 0.5*time),
          )
      })
    })

    material({color: [0.6, 0.1, 0.3, 1]}, () => {
      box({
        position: [0, 1, 0],
        scale:
          vec3.transformQuat([], [1, 1, 1],
                             quat.setAxisAngle([], [1, 1, 1], 0.5*time))
      })

      capsule({
        position: [4, 4, 4],
        rotation: quat.setAxisAngle([], [1, 0, 0], 0.5*time)
      })
    })

    material({color: [0.1, 0.5, 0.4, 1]}, () => {
      sphere({
        position:
          vec3.transformQuat([], [-5, 1, 5],
                             quat.setAxisAngle([], [0, 1, 0], 0.5*time))
      })

      triangle({
        position: [0, 5, 0],
        rotation: quat.setAxisAngle([], [0, 1, 0], 0.5*time)
      })
    })
  })
})
