#pragma glslify: export(DirectionalLight)
struct DirectionalLight {
  mat4 transform;
  vec4 position;
  vec4 color;
  bool visible;
  float radius;
  float ambient;
  float intensity;
};
