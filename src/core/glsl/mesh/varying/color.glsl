#ifndef GLSL_MESH_VARYING_COLOR
#define GLSL_MESH_VARYING_COLOR

#ifndef GLSL_MESH_VARYING_NO_COLOR
#ifdef GLSL_MESH_VARYING_HAVE_COLOR
#define GLSL_MESH_VARYING_USE_COLOR
varying vec4 vColor;

#ifdef GLSL_MESH_VARYING_EMIT
void emitVaryingColor(vec4 color) {
  vColor = color;
}

void emitVaryingColor(vec3 color) {
  emitVaryingColor(vec4(color, 1.0));
}

void emitVaryingColors(vec4 color) {
  emitVaryingColor(color);
}

void emitVaryingColors(vec3 color) {
  emitVaryingColors(vec4(color, 1.0));
}


#endif

#endif
#endif

#endif
