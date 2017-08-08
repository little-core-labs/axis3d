#ifndef GLSL_VARYING_EMIT_NORMAL
#define GLSL_VARYING_EMIT_NORMAL
#ifdef GLSL_VARYING_NORMAL

#include "../variables"

void EmitVaryingLocalNormal(vec3 normal) {
  GLSL_VARYING_LOCAL_NORMAL_VARIABLE = normalize(normal);
}

void EmitVaryingNormal(mat3 modelNormal, vec3 normal) {
  GLSL_VARYING_NORMAL_VARIABLE = normalize(modelNormal * normal);
}

void EmitVaryingNormals(mat3 modelNormal, vec3 normal) {
  EmitVaryingNormal(modelNormal, normal);
  EmitVaryingLocalNormal(normal);
}

#endif
#endif
