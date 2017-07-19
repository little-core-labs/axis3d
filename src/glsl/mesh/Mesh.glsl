#pragma glslify: export(Mesh)
struct Mesh {
  vec4 rotation;
  vec3 position;
  vec3 scale;
  mat4 model;
  mat3 modelNormal;
};
