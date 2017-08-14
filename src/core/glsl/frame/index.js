import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
  [__dirname + '/frame']: glslify(__dirname + '/frame.glsl'),
})

