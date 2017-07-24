#ifndef GLSL_MESH_FRAGMENT
#define GLSL_MESH_FRAGMENT

vec4 MeshFragment(vec4 color) {
  return color;
}

vec4 MeshFragment(float r, float g, float b, float a) {
  return MeshFragment(vec4(r, g, b, a));
}

vec4 MeshFragment(float r, float g, float b) {
  return MeshFragment(r, g, b, 1.0);
}

vec4 MeshFragment(float c) {
  return MeshFragment(c, c, c, 1.0);
}

vec4 MeshFragment(vec3 color, float opacity) {
  return MeshFragment(vec4(color, opacity));
}

vec4 MeshFragment(vec3 color) {
  return MeshFragment(color, 1.0);
}

#include "fragment/main"

#endif
