import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
  [__dirname + '/cube']: glslify(__dirname + '/cube.glsl'),
  [__dirname + '/2d']: glslify(__dirname + '/2d.glsl'),
})
