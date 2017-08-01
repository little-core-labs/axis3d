import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/fragment/main']: glslify(__dirname + '/fragment/main.glsl'),
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/material']: glslify(__dirname + '/material.glsl'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
})
