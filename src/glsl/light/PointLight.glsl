#pragma glslify: export(PointLight)
struct PointLight {
  mat4 transform;
  vec4 position;
  vec4 color;
  bool visible;
  float radius;
  float ambient;
  float intensity;
};
