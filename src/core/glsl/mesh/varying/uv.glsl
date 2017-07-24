#ifndef GLSL_MESH_VARYING_UV
#define GLSL_MESH_VARYING_UV

#ifndef GLSL_MESH_VARYING_NO_UV
#ifdef GLSL_MESH_VARYING_HAVE_UV
#define GLSL_MESH_VARYING_USE_UV

varying vec2 vUv;

#ifdef GLSL_MESH_VARYING_EMIT
void emitVaryingUv(vec2 uv) {
  vUv = uv;
}

void emitVaryingUvs(vec2 uv) {
  emitVaryingUv(uv);
}
#endif

#endif
#endif
#endif
