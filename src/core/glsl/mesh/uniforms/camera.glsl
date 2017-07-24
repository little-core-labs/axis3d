#ifndef GLSL_MESH_UNIFORMS_CAMERA
#define GLSL_MESH_UNIFORMS_CAMERA

#ifndef GLSL_MESH_UNIFORMS_NO_CAMERA
#ifdef GLSL_MESH_UNIFORMS_HAVE_CAMERA

#define GLSL_MESH_UNIFORMS_USE_CAMERA
#define GLSL_CAMERA_HAVE_PROJECTION
#define GLSL_CAMERA_HAVE_VIEW

#include "../../camera/camera"
uniform Camera camera;
#endif
#endif

#endif
