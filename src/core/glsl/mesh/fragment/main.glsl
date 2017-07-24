#ifndef GLSL_MESH_FRAGMENT_MAIN
#define GLSL_MESH_FRAGMENT_MAIN

#ifndef GLSL_MESH_FRAGMENT_NO_MAIN
#define GLSL_MESH_FRAGMENT_USE_MAIN

#define GLSL_MESH_UNIFORMS_NO_CAMERA
#define GLSL_MESH_UNIFORMS_NO_MESH
#define GLSL_MESH_VARYING_HAVE_UV

#include <common/common>
#include "../uniforms"
#include "../varying"

#ifdef GLSL_MESH_FRAGMENT_TRANSFORM_MAIN_FUNCTION
  void GLSL_MESH_FRAGMENT_TRANSFORM_MAIN_FUNCTION();
#endif

#ifdef GLSL_MESH_FRAGMENT_BEFORE_MAIN_FUNCTION
  void GLSL_MESH_FRAGMENT_BEFORE_MAIN_FUNCTION();
#endif

#ifdef GLSL_MESH_FRAGMENT_AFTER_MAIN_FUNCTION
  void GLSL_MESH_FRAGMENT_AFTER_MAIN_FUNCTION();
#endif

void TransformMain() {
#ifdef GLSL_MESH_FRAGMENT_TRANSFORM_FUNCTION
  GLSL_MESH_FRAGMENT_TRANSFORM_FUNCTION();
#endif
}

void BeforeMain() {
#ifdef GLSL_MESH_FRAGMENT_BEFORE_MAIN_FUNCTION
    GLSL_MESH_FRAGMENT_BEFORE_MAIN_FUNCTION();
#endif
}

void AfterMain() {
#ifdef GLSL_MESH_FRAGMENT_AFTER_MAIN_FUNCTION
    GLSL_MESH_FRAGMENT_AFTER_MAIN_FUNCTION();
#endif
}

float fragOpacity;
vec3 fragColor;

void Initialize() {
  fragColor = vec3(0.0);
  fragOpacity = 1.0;

#ifdef GLSL_MESH_FRAGMENT_DEFAULT_FRAG_COLOR
  fragColor = GLSL_MESH_FRAGMENT_DEFAULT_FRAG_COLOR;
#endif

#ifdef GLSL_MESH_FRAGMENT_DEFAULT_FRAG_OPACITY
  fragOpacity = GLSL_MESH_FRAGMENT_DEFAULT_FRAG_OPACITY;
#endif
}

void Configure() {
#ifdef GLSL_MESH_UNIFORMS_USE_MATERIAL

#ifdef GLSL_MATERIAL_USE_COLOR
  fragColor = material.color;
#endif

#ifdef GLSL_MATERIAL_USE_OPACITY
  fragOpacity = material.opacity;
#endif

#endif

#ifdef GLSL_MESH_VARYING_USE_COLOR
  fragColor = vColor.rgb;
  fragOpacity = vColor.opacity;
#endif
}

void SetFragColor() {
  gl_FragColor = MeshFragment(fragColor, fragOpacity);
}

void main() {
  Initialize();
  BeforeMain();
  Configure();
  SetFragColor();
  TransformMain();
  AfterMain();
}

#endif
#endif
