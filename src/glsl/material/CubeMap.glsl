#pragma glslify: export(Cubemap)
struct Cubemap {
  vec2 resolution;
  samplerCube data;
};