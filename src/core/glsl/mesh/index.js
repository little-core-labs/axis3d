import glslify from 'glslify'

Object.assign(exports, {
  [__dirname + '/variables']: glslify(__dirname + '/variables.glsl'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
  [__dirname + '/fragment']: glslify(__dirname + '/fragment.glsl'),
  [__dirname + '/vertex']: glslify(__dirname + '/vertex.glsl'),
  [__dirname + '/main']: glslify(__dirname + '/main.glsl'),
  [__dirname + '/mesh']: glslify(__dirname + '/mesh.glsl'),
})

