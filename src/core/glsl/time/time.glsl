#ifndef GLSL_TIME
#define GLSL_TIME

#include "./variables"

uniform float GLSL_TIME_UNIFORM_VARIABLE;

float GetTime() {
  return GLSL_TIME_UNIFORM_VARIABLE;
}

#endif
