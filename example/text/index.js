'use strict'

import {
  PerspectiveCamera,
  DirectionalLight,
  PhongMaterial,
  Quaternion,
  Context,
  Vector3,
  Color,
  Frame,
  Text,
  Mesh,
} from '../../src'

import quat from 'gl-quat'

const ctx = new Context()
const material = new PhongMaterial(ctx)
const camera = new PerspectiveCamera(ctx)
const light = new DirectionalLight(ctx)
const frame = new Frame(ctx)

const rotation = new Quaternion()
const position = new Vector3(0, 0, 5)
const angle = new Quaternion()
const color = new Color('purple')
const text = new Text(ctx)

frame(({time, clear}) => {
  clear({color: new Color('alice blue')})
  quat.setAxisAngle(angle, [0, 1, 0], 0.3*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  camera({rotation, position}, () => {
    light({position: [1, 1, 1]})

    material({color, cull: false}, () => {
      text('axis3d')
    })

    material({color: new Color(0x0000ff), cull: false}, () => {
      text({scale: 0.5, position: [0, -1, 0], text: `${time|0}`})
    })
  })
})
