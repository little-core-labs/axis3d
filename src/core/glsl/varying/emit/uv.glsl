#ifndef GLSL_VARYING_EMIT_UV
#define GLSL_VARYING_EMIT_UV
#ifdef GLSL_VARYING_UV

#include "../variables"

void EmitVaryingUv(vec2 uv) {
  GLSL_VARYING_UV_VARIABLE = uv;
}

void EmitVaryingUvs(vec2 uv) {
  EmitVaryingUv(uv);
}

#endif
#endif
