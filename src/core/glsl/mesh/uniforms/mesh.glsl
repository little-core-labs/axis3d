#ifndef GLSL_MESH_UNIFORMS_MESH
#define GLSL_MESH_UNIFORMS_MESH

#ifndef GLSL_MESH_UNIFORMS_NO_MESH
#ifdef GLSL_MESH_UNIFORMS_HAVE_MESH

#define GLSL_MESH_UNIFORMS_USE_MESH
#define GLSL_MESH_HAVE_MODEL
#define GLSL_MESH_HAVE_SCALE

#include "../mesh"
uniform Mesh mesh;
#endif
#endif

#endif
