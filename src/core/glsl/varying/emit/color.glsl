#ifndef GLSL_VARYING_EMIT_COLOR
#define GLSL_VARYING_EMIT_COLOR
#ifdef GLSL_VARYING_COLOR

#include "../variables"

void EmitVaryingColor(vec4 color) {
  GLSL_VARYING_COLOR_VARIABLE = color;
}

void EmitVaryingColor(vec3 color) {
  EmitVaryingColor(vec4(color, 1.0));
}

void EmitVaryingColors(vec4 color) {
  EmitVaryingColor(color);
}

void EmitVaryingColors(vec3 color) {
  EmitVaryingColors(vec4(color, 1.0));
}

#endif
#endif
