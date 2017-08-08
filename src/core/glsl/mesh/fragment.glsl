#pragma glslify: export(MeshFragment)
#ifndef GLSL_MESH_FRAGMENT
#define GLSL_MESH_FRAGMENT

#ifndef GLSL_MESH_FRAGMENT_DEFAULT_COLOR
#define GLSL_MESH_FRAGMENT_DEFAULT_COLOR vec4(0.25882352941176473, 0.5254901960784314, 0.9568627450980393, 1.0)
#endif

vec4 MeshFragment(void) {
  return vec4(GLSL_MESH_FRAGMENT_DEFAULT_COLOR);
}

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

#endif
