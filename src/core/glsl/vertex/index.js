import glslify from 'glslify'

Object.assign(exports, {
  ...require('./attributes'),
  [__dirname + '/main']: glslify(__dirname + '/main.glsl'),
})

