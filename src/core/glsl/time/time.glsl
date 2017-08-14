#ifndef GLSL_TIME
#define GLSL_TIME

#include "../frame/frame"
#include "../frame/uniforms"
#include "../frame/variables"

float GetTime() {
  return GLSL_FRAME_UNIFORM_VARIABLE.time;
}

#endif
