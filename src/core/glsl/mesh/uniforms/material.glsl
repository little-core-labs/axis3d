#ifndef GLSL_MESH_UNIFORMS_MATERIAL
#define GLSL_MESH_UNIFORMS_MATERIAL

#ifndef GLSL_MESH_UNIFORMS_NO_MATERIAL
#ifdef GLSL_MESH_UNIFORMS_HAVE_MATERIAL

#define GLSL_MESH_UNIFORMS_USE_MATERIAL
#define GLSL_MATERIAL_HAVE_COLOR

#include "../../material/material"
uniform Material material;

#endif
#endif
#endif
