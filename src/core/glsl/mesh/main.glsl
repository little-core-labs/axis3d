#ifndef GLSL_MESH_MAIN
#define GLSL_MESH_MAIN

#include <camera/camera>
#include <mesh/vertex>
#include <mesh/mesh>

#include <camera/uniforms>
#include <mesh/uniforms>

#include <vertex/attributes/position>
#include <vertex/attributes/normal>
#include <vertex/attributes/uv>

#include <varying/position>
#include <varying/normal>
#include <varying/uv>
#include <varying/emit>

#include <vertex/main>

void Main(inout vec4 vertexPosition, inout VaryingData data) {
  vertexPosition = MeshVertex(
      camera.projection,
      camera.view,
      ${uniformName}.model,
      position);
}

#endif
