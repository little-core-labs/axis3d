#pragma glslify: export(Mesh)
#ifndef GLSL_MESH
#define GLSL_MESH 1

struct Mesh {
#ifndef GLSL_MESH_NO_ROTATION
#ifdef GLSL_MESH_HAVE_ROTATION
#define GLSL_MESH_USE_ROTATION
  vec4 rotation;
#endif
#endif

#ifndef GLSL_MESH_NO_POSITION
#ifdef GLSL_MESH_HAVE_POSITION
#define GLSL_MESH_USE_POSITION
  vec3 position;
#endif
#endif

#ifndef GLSL_MESH_NO_SCALE
#ifdef GLSL_MESH_HAVE_SCALE
#define GLSL_MESH_USE_SCALE
  vec3 scale;
#endif
#endif

#ifndef GLSL_MESH_NO_MODEL
#ifdef GLSL_MESH_HAVE_MODEL
#define GLSL_MESH_USE_MODEL
  mat4 model;
  mat3 modelNormal;
#endif
#endif
};

#endif
