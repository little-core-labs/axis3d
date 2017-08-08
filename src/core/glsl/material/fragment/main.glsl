#ifndef GLSL_MATERIAL_FRAGMENT_MAIN
#define GLSL_MATERIAL_FRAGMENT_MAIN

#include "../material"
#include "../uniforms"
#include "../variables"

#include "../../mesh/fragment"
#include "../../fragment/main"
#include "../../varying/read"

void Main(inout vec4 fragColor, inout VaryingData data) {
  fragColor = MeshFragment(
      GLSL_MATERIAL_UNIFORM_VARIABLE.color,
      GLSL_MATERIAL_UNIFORM_VARIABLE.opacity);
}

#endif
