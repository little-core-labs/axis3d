#ifndef GLSL_VARYING_EMIT_POSITION
#define GLSL_VARYING_EMIT_POSITION
#ifdef GLSL_VARYING_POSITION

#include "../variables"

void EmitVaryingLocalPosition(vec3 position) {
  GLSL_VARYING_LOCAL_POSITION_VARIABLE = position;
}

void EmitVaryingPosition(mat4 model, vec3 scale, vec3 position) {
  vec4 worldPosition = model * vec4(scale*position, 1.0);
  GLSL_VARYING_POSITION_VARIABLE = worldPosition.xyz;
}

void EmitVaryingPositions(mat4 model, vec3 scale, vec3 position) {
  EmitVaryingPosition(model, scale, position);
  EmitVaryingLocalPosition(position);
}

#endif
#endif
