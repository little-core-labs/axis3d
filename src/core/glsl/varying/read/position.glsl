#ifndef GLSL_VARYING_READ_POSITION
#define GLSL_VARYING_READ_POSITION
#ifdef GLSL_VARYING_POSITION

#include "../variables"

vec3 ReadVaryingLocalPosition() {
  return vec3(GLSL_VARYING_LOCAL_POSITION_VARIABLE);
}

vec3 ReadVaryingPosition() {
  return vec3(GLSL_VARYING_POSITION_VARIABLE);
}

#endif
#endif
