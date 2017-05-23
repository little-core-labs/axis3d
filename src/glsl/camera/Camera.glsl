/**
 * Modulue exports.
 */

#pragma glslify: export(Camera)

/**
 * Camera structure.
 */

struct Camera {
  mat4 invertedView;
  mat4 projection;
  float aspect;
  mat4 view;
  vec3 eye;
};
