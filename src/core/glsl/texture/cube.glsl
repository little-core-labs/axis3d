#pragma glslify: export(TextureCube)
#ifndef GLSL_TEXTURE_CUBE
#define GLSL_TEXTURE_CUBE

struct TextureCube {
  vec2 resolution;
  samplerCube data;
};

#endif
