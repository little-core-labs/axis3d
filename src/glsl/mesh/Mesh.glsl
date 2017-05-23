#pragma glslify: Object3D = require('../object/Object3D')
#pragma glslify: export(Mesh)
struct Mesh {
  mat4 model;
  mat3 modelNormal;
  Object3D object;
};
