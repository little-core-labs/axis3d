#ifndef GLSL_VARYING_READ_UV
#define GLSL_VARYING_READ_UV
#ifdef GLSL_VARYING_UV

#include "../variables"

vec2 ReadVaryingUv() {
  return vec2(GLSL_VARYING_UV_VARIABLE);
}

#endif
#endif
