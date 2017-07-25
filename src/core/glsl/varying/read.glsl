#ifndef GLSL_VARYING_READ
#define GLSL_VARYING_READ

#include "./read/position"
#include "./read/normal"
#include "./read/color"
#include "./read/uv"
#include "./variables"
#include "./data"

VaryingData ReadVaryingData() {
  VaryingData data = CreateVaryingData();
#if defined(GLSL_VARYING_POSITION) && defined(GLSL_VARYING_READ_POSITION)
  data.localPosition = GLSL_VARYING_LOCAL_POSITION_VARIABLE;
  data.position = GLSL_VARYING_POSITION_VARIABLE;
#endif

#if defined(GLSL_VARYING_NORMAL) && defined(GLSL_VARYING_READ_NORMAL)
  data.localNormal = GLSL_VARYING_LOCAL_NORMAL_VARIABLE;
  data.normal = GLSL_VARYING_NORMAL_VARIABLE;
#endif

#if defined(GLSL_VARYING_COLOR) && defined(GLSL_VARYING_READ_COLOR)
  data.color = GLSL_VARYING_COLOR_VARIABLE;
#endif

#if defined(GLSL_VARYING_UV) && defined(GLSL_VARYING_READ_UV)
  data.uv = GLSL_VARYING_UV_VARIABLE;
#endif
  return data;
}

#endif
