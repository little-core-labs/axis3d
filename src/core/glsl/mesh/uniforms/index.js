import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/material']: glslify(__dirname + '/material.glsl'),
  [__dirname + '/camera']: glslify(__dirname + '/camera.glsl'),
  [__dirname + '/mesh']: glslify(__dirname + '/mesh.glsl'),
})
