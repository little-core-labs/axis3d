import glslify from 'glslify'

Object.assign(exports, {
  ...require('./emit'),
  ...require('./read'),
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/position']: glslify(__dirname + '/position.glsl'),
  [__dirname + '/normal']: glslify(__dirname + '/normal.glsl'),
  [__dirname + '/color']: glslify(__dirname + '/color.glsl'),
  [__dirname + '/data']: glslify(__dirname + '/data.glsl'),
  [__dirname + '/emit']: glslify(__dirname + '/emit.glsl'),
  [__dirname + '/read']: glslify(__dirname + '/read.glsl'),
  [__dirname + '/uv']: glslify(__dirname + '/uv.glsl'),
})
