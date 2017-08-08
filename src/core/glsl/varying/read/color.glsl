#ifndef GLSL_VARYING_READ_COLOR
#define GLSL_VARYING_READ_COLOR
#ifdef GLSL_VARYING_COLOR

#include "../variables"

vec4 ReadVaryingColor() {
  return vec4(GLSL_VARYING_COLOR_VARIABLE);
}

#endif
#endif
