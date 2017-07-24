#ifndef GLSL_MESH_VARYING_NORMAL
#define GLSL_MESH_VARYING_NORMAL

#ifndef GLSL_MESH_VARYING_NO_NORMAL
#ifdef GLSL_MESH_VARYING_HAVE_NORMAL
#define GLSL_MESH_VARYING_USE_NORMAL
varying vec3 vLocalNormal;
varying vec3 vNormal;

#ifdef GLSL_MESH_VARYING_EMIT
void emitVaryingLocalNormal(vec3 normal) {
  vNormal = normalize(normal);
}

void emitVaryingNormal(mat3 modelNormal, vec3 normal) {
  vNormal = normalize(modelNormal * normal);
}

void emitVaryingNormals(mat3 modelNormal, vec3 normal) {
  emitVaryingNormal(modelNormal, normal);
  emitVaryingLocalNormal(normal);
}
#endif

#endif
#endif

#endif
