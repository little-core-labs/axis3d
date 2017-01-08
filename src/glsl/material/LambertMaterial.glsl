#pragma glslify: export(LambertMaterial)
struct LambertMaterial {
  vec4 emissive;
  vec4 ambient;
  vec4 color;

  float roughness;
  float opacity;
  float albedo;
  float type;
};
