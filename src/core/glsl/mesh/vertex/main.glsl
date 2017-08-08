#ifndef GLSL_MESH_VERTEX_MAIN
#define GLSL_MESH_VERTEX_MAIN

#include "../variables"
#include "../uniforms"
#include "../vertex"
#include "../mesh"

#include "../../camera/camera"
#include "../../camera/uniforms"

#ifdef GLSL_MESH_HAS_POSITION
#include "../../vertex/attributes/position"
#include "../../varying/position"
#endif

#ifdef GLSL_MESH_HAS_NORMAL
#include "../../vertex/attributes/normal"
#include "../../varying/normal"
#endif

#ifdef GLSL_MESH_HAS_UV
#include "../../vertex/attributes/uv"
#include "../../varying/uv"
#endif

#include "../../varying/emit"
#include "../../vertex/main"

void Main(inout vec4 vertexPosition, inout VaryingData data) {
  vertexPosition = MeshVertex(
      GLSL_CAMERA_UNIFORM_VARIABLE.projection,
      GLSL_CAMERA_UNIFORM_VARIABLE.view,
      GLSL_MESH_UNIFORM_VARIABLE.model,
      GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE);
}

#endif
