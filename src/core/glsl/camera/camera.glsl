#pragma glslify: export(Camera)
#ifndef GLSL_CAMERA
#define GLSL_CAMERA

struct Camera {
  mat4 invertedView;
  mat4 projection;
  mat4 view;
  vec3 eye;
};

#endif
