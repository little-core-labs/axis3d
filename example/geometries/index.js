'use strict'

import {
  DirectionalLight,
  LambertMaterial,
  FlatMaterial,
  PointLight,
  Context,
  Camera,
  Frame,
  Mesh,
} from 'axis3d'

import {
  TriangleGeometry,
  CylinderGeometry,
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
const material = LambertMaterial(ctx)
const camera = Camera(ctx, {position: [5, 8, 12]})
const frame = Frame(ctx)
const angle = [0, 0, 0, 1]

const triangle = Mesh(ctx, { geometry: TriangleGeometry() })
const cylinder = Mesh(ctx, { geometry: CylinderGeometry() })
const capsule = Mesh(ctx, { geometry: CapsuleGeometry() })
const sphere = Mesh(ctx, { geometry: SphereGeometry() })
const plane = Mesh(ctx, { geometry: PlaneGeometry({ segments: 16, size: 30 }) })
const torus = Mesh(ctx, { geometry: TorusGeometry() })
const box = Mesh(ctx, { geometry: BoxGeometry() })

const directionalLight = DirectionalLight(ctx)

const point = (() => {
  //const material = LambertMaterial(ctx)
  const material = FlatMaterial(ctx)
  const geometry = SphereGeometry({radius: 0.05, segments: 2})
  const sphere = Mesh(ctx, {geometry})
  const light = PointLight(ctx)
  return (state = {}, block) => {
    const power = 2 - (1 + Math.cos(ctx.regl.now()))
    if (Array.isArray(state)) {
      for (let s of state) {
        s.scale = [power, power, power]
        s.radius = 1.5*power
      }
    } else {
      state.scale = [power, power, power]
      state.radius = 1.5*power
    }

    material(state, ({}, args = {}) => {
      sphere(args, () => {
        light(args)
      })
    })
  }
})()

frame(({time}) => {
  const multiply = (...args) => quat.multiply([], ...args)
  const position = [-5, -5, -5]

  // camera rotation
  quat.setAxisAngle(angle, [0, 1, 0], 0.125*time)
  quat.slerp(rotation, rotation, angle, 0.01)

  // point lights position
  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [1, 0, 0], 0.5*time))

  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [0, 1, 0], 0.5*time))

  vec3.transformQuat(
    position,
    position,
    quat.setAxisAngle([], [0, 0, 1], 0.5*time))

  camera({rotation}, () => {
    directionalLight({position: [20, 60, 20]})
    directionalLight({position: [-20, -60, -20]})
    point([
      {
        color: [0.8, 0.1, 0.2, 1],
        position,
      }, {
        color: [0.2, 0.2, 0.8, 1.0],
        position: vec3.negate([], position),
      },
      {
        color: [0.2, 0.8, 0.4, 1],
        position:
          vec3.transformQuat(
            [],
            vec3.add([], vec3.negate([], position), [2, 2, 2]),
            quat.setAxisAngle([], [0, 0, 1], 0.5*time)),
      },
    ])

    material({color: [1, 1, 1, 1], opacity: 1}, () => {
      plane({
        wireframe: true,
        rotation: quat.setAxisAngle([], [1, 0, 0], 0.5*Math.PI)
      })

      cylinder({position: [5, 3, 5]})
    })

    material({color: [0.125, 0.125, 0.75, 1], opacity: 1}, () => {
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
