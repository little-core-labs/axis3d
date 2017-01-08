#pragma glslify: export(PhongMaterial)
struct PhongMaterial {
  vec4 specular;
  vec4 emissive;
  vec4 ambient;
  vec4 color;

  float shininess;
  float roughness;
  float opacity;
  float albedo;
  float type;
};
