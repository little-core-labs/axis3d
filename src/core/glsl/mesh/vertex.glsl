#pragma glslify: export(MeshVertex)
#ifndef GLSL_MESH_VERTEX
#define GLSL_MESH_VERTEX

#ifndef GLSL_MESH_VERTEX_DEFAULT_POSITION
#define GLSL_MESH_VERTEX_DEFAULT_POSITION vec4(0.0, 0.0, 0.0, 1.0)
#endif

vec4 MeshVertex(void) {
  return vec4(GLSL_MESH_VERTEX_DEFAULT_POSITION);
}

vec4 MeshVertex(vec4 position) {
  return position;
}

vec4 MeshVertex(mat4 transform, vec4 position) {
  return MeshVertex(transform * position);
}

vec4 MeshVertex(mat4 transform, vec3 position) {
  return MeshVertex(transform, vec4(position, 1.0));
}

vec4 MeshVertex(mat4 transform, mat4 model, vec4 position) {
  return MeshVertex(transform * model * position);
}

vec4 MeshVertex(mat4 transform, mat4 model, vec3 position) {
  return MeshVertex(transform, model, vec4(position, 1.0));
}

vec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec4 position) {
  return MeshVertex(projection * view * model, position);
}

vec4 MeshVertex(mat4 projection, mat4 view, mat4 model, vec3 position) {
  return MeshVertex(projection, view, model, vec4(position, 1.0));
}

#endif
