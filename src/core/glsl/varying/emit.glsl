#ifndef GLSL_VARYING_EMIT
#define GLSL_VARYING_EMIT

#include "./emit/position"
#include "./emit/normal"
#include "./emit/color"
#include "./emit/uv"
#include "./data"

void EmitVaryingData(const in VaryingData data) {
#if defined(GLSL_VARYING_POSITION) && defined(GLSL_VARYING_EMIT_POSITION)
  EmitVaryingPositions(data.model, data.position);
#endif

#if defined(GLSL_VARYING_NORMAL) && defined(GLSL_VARYING_EMIT_NORMAL)
  EmitVaryingNormals(data.modelNormal, data.normal);
#endif

#if defined(GLSL_VARYING_COLOR) && defined(GLSL_VARYING_EMIT_COLOR)
  EmitVaryingColors(data.color);
#endif

#if defined(GLSL_VARYING_UV) && defined(GLSL_VARYING_EMIT_UV)
  EmitVaryingUvs(data.uv);
#endif
}

#endif
