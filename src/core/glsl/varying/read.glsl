#ifndef GLSL_VARYING_READ
#define GLSL_VARYING_READ

#include "./read/position"
#include "./read/normal"
#include "./read/color"
#include "./read/uv"
#include "./data"

VaryingData ReadVaryingData() {
  VaryingData data = CreateVaryingData();
#if defined(GLSL_VARYING_POSITION) && defined(GLSL_VARYING_READ_POSITION)
  data.localPosition = ReadVaryingLocalPosition();
  data.position = ReadVaryingPosition();
#endif

#if defined(GLSL_VARYING_NORMAL) && defined(GLSL_VARYING_READ_NORMAL)
  data.localNormal = ReadVaryingLocalNormal();
  data.normal = ReadVaryingNormal();
#endif

#if defined(GLSL_VARYING_COLOR) && defined(GLSL_VARYING_READ_COLOR)
  data.color = ReadVaryingColor();
#endif

#if defined(GLSL_VARYING_UV) && defined(GLSL_VARYING_READ_UV)
  data.uv = ReadVaryingUv();
#endif
  return data;
}

#endif
