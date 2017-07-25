import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/position']: glslify(__dirname + '/position.glsl'),
  [__dirname + '/normal']: glslify(__dirname + '/normal.glsl'),
  [__dirname + '/color']: glslify(__dirname + '/color.glsl'),
  [__dirname + '/uv']: glslify(__dirname + '/uv.glsl'),
})
