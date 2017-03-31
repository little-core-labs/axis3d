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
} from 'axis3d'

import quat from 'gl-quat'

const ctx = Context()
const material = PhongMaterial(ctx)
const camera = PerspectiveCamera(ctx)
const light = DirectionalLight(ctx)
const frame = Frame(ctx)

const rotation = Quaternion()
const position = Vector3(0, 0, 5)
const angle = Quaternion()
const color = Color('purple')
const text = Text(ctx)

frame(({time, clear}) => {
  clear({color: Color('alice blue')})
  quat.setAxisAngle(angle, [0, 1, 0], 0.3*time)
  quat.slerp(rotation, rotation, angle, 0.5)

  camera({rotation, position}, () => {
    light({position: [1, 1, 1]})

    material({color, cull: false}, () => {
      text('axis3d')
    })

    material({color: Color(0x0000ff) , cull: false}, () => {
      text({scale: 0.5, position: [0, -1, 0], text: `${time|0}`})
    })
  })
})
