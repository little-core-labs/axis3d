#pragma glslify: export(Camera)
#ifndef GLSL_CAMERA
#define GLSL_CAMERA 1

struct Camera {
#ifndef GLSL_CAMERA_NO_PROJECTION
#ifdef GLSL_CAMERA_HAVE_PROJECTION
#define GLSL_CAMERA_USE_PROJECTION
  mat4 projection;
#endif
#endif

#ifndef GLSL_CAMERA_NO_VIEW
#ifdef GLSL_CAMERA_HAVE_VIEW
#define GLSL_CAMERA_USE_VIEW
  mat4 view;
#endif
#endif
};

#endif
