#pragma glslify: export(Material)
#ifndef GLSL_MATERIAL
#define GLSL_MATERIAL 1

struct Material {
#ifndef GLSL_MATERIAL_NO_COLOR
#ifdef GLSL_MATERIAL_HAVE_COLOR
#define GLSL_MATERIAL_USE_COLOR
  vec3 color;
#endif
#endif

#ifndef GLSL_MATERIAL_NO_OPACITY
#ifdef GLSL_MATERIAL_HAVE_OPACITY
#define GLSL_MATERIAL_USE_OPACITY
  float opacity;
#endif
#endif
};

#endif
