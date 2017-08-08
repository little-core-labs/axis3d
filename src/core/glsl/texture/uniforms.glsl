#ifndef GLSL_TEXTURE_UNIFORMS
#define GLSL_TEXTURE_UNIFORMS

#include "./variables"

#ifdef GLSL_TEXTURE_2D
uniform Texture2D GLSL_TEXTURE_2D_VARIABLE;
#endif

#ifdef GLSL_TEXTURE_CUBE
uniform TextureCube GLSL_TEXTURE_CUBE_VARIABLE;
#endif

#endif
