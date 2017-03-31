#pragma glslify: export(PositionedLight)
struct PositionedLight {
  vec4 position;
  vec4 color;
  float radius;
  float ambient;
  float intensity;
};
