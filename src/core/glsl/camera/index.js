import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
  [__dirname + '/camera']: glslify(__dirname + '/camera.glsl'),
})
