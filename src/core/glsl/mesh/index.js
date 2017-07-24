import glslify from 'glslify'

Object.assign(exports, {
  ...require('./fragment'),
  ...require('./uniforms'),
  ...require('./varying'),
  ...require('./vertex'),
  [__dirname + '/uniforms']: glslify(__dirname + '/uniforms.glsl'),
  [__dirname + '/fragment']: glslify(__dirname + '/fragment.glsl'),
  [__dirname + '/varying']: glslify(__dirname + '/varying.glsl'),
  [__dirname + '/vertex']: glslify(__dirname + '/vertex.glsl'),
  [__dirname + '/mesh']: glslify(__dirname + '/mesh.glsl'),
})

