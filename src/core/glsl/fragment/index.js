import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/main']: glslify(__dirname + '/main.glsl'),
})

