#pragma glslify: export(Texture2D)
#ifndef GLSL_TEXTURE_2D
#define GLSL_TEXTURE_2D

struct Texture2D {
  vec2 resolution;
  sampler2D data;
};

#endif
