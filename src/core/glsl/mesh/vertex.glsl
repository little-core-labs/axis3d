#ifndef GLSL_MESH_VERTEX
#define GLSL_MESH_VERTEX

vec4 MeshVertex(mat4 transform, vec4 position) {
  return transform * position;
}

vec4 MeshVertex(mat4 transform, vec3 position) {
  return MeshVertex(transform, vec4(position, 1.0));
}

vec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec4 position) {
  return MeshVertex(projection * view * model, position);
}

vec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec3 position) {
  return MeshVertex(projection, view, model, vec4(position, 1.0));
}

#include "vertex/main"

#endif
