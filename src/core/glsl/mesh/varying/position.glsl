#ifndef GLSL_MESH_VARYING_POSITION
#define GLSL_MESH_VARYING_POSITION

#ifndef GLSL_MESH_VARYING_NO_POSITION
#ifdef GLSL_MESH_VARYING_HAVE_POSITION
#define GLSL_MESH_VARYING_USE_POSITION
varying vec3 vLocalPosition;
varying vec3 vPosition;

#ifdef GLSL_MESH_VARYING_EMIT
void emitVaryingLocalPosition(vec3 position) {
  vLocalPosition = position;
}

void emitVaryingPosition(mat4 model, vec3 scale, vec3 position) {
  vec4 worldPosition = model * vec4(scale*position, 1.0);
  vPosition = worldPosition.xyz;
}

void emitVaryingPositions(mat4 model, vec3 scale, vec3 position) {
  emitVaryingPosition(model, scale, position);
  emitVaryingLocalPosition(position);
}
#endif

#endif
#endif

#endif
