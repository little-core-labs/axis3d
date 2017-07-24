'use strict'
import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/camera']: glslify(__dirname + '/camera.glsl'),
})
