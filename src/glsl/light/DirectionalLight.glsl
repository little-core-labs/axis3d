#pragma glslify: export(DirectionalLight)
struct DirectionalLight {
  vec4 position;
  vec4 color;
  bool visible;
  float radius;
  float ambient;
  float intensity;
};
