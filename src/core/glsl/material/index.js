'use strict'
import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/material']: glslify(__dirname + '/material.glsl'),
})
