'use strict'
import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/common']: glslify(__dirname + '/common.glsl'),
})
