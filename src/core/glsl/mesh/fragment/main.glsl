#ifndef GLSL_MESH_FRAGMENT_MAIN
#define GLSL_MESH_FRAGMENT_MAIN

#include "../mesh"
#include "../uniforms"
#include "../variables"

#ifdef GLSL_MESH_HAS_POSITION
#include "../../varying/position"
#endif

#ifdef GLSL_MESH_HAS_NORMAL
#include "../../varying/normal"
#endif

#include "../../mesh/fragment"
#include "../../fragment/main"
#include "../../varying/read"

void Main(inout vec4 fragColor, inout VaryingData data) {
#ifdef GLSL_MESH_HAS_POSITION
  fragColor = MeshFragment(data.position);
#endif

#ifdef GLSL_MESH_HAS_NORMAL
  fragColor = MeshFragment(data.normal);
#endif

}

#endif
