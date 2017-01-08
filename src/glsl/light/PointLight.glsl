#pragma glslify: export(PointLight)
struct PointLight {
  vec4 position;
  vec4 color;
  bool visible;
  float radius;
  float ambient;
  float intensity;
};
