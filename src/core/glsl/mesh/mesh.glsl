#pragma glslify: export(Mesh)
#ifndef GLSL_MESH
#define GLSL_MESH

struct Mesh {
  vec4 rotation;
  vec3 position;
  vec3 scale;
  mat4 model;
  mat3 modelNormal;
};

#endif
