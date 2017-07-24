import glslify from 'glslify'

Object.assign(exports, {
  ...require('./attributes'),
  [__dirname + '/attributes']: glslify(__dirname + '/attributes.glsl'),
  [__dirname + '/main']: glslify(__dirname + '/main.glsl'),
})

