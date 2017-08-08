#ifndef GLSL_VARYING_READ_NORMAL
#define GLSL_VARYING_READ_NORMAL
#ifdef GLSL_VARYING_NORMAL

#include "../variables"

vec3 ReadVaryingLocalNormal() {
  return vec3(GLSL_VARYING_LOCAL_NORMAL_VARIABLE);
}

vec3 ReadVaryingNormal() {
  return vec3(GLSL_VARYING_NORMAL_VARIABLE);
}

#endif
#endif
