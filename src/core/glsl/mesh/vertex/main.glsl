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
#endif

#ifdef GLSL_MESH_HAS_NORMAL
#include "../../vertex/attributes/normal"
#endif

#ifdef GLSL_MESH_HAS_UV
#include "../../vertex/attributes/uv"
#endif

#include "../../varying/position"
#include "../../varying/normal"
#include "../../varying/uv"
#include "../../varying/emit"

#include "../../vertex/main"

void Main(inout vec4 vertexPosition, inout VaryingData data) {
  vertexPosition = MeshVertex(
      camera.projection,
      camera.view,
      GLSL_MESH_UNIFORM_VARIABLE.model,
      position);
}

#endif
