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

#if defined(GLSL_VERTEX_ATTRIBUTES_INSTANCING)
attribute vec4 GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE1;
attribute vec4 GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE2;
attribute vec4 GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE3;
attribute vec4 GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE4;
#endif

void Main(inout vec4 vertexPosition, inout VaryingData data) {
#if defined(GLSL_VERTEX_ATTRIBUTES_INSTANCING)
  mat4 model = mat4(
    GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE1,
    GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE2,
    GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE3,
    GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE4
  );
#endif

  vertexPosition = MeshVertex(
#ifdef GLSL_CAMERA_UNIFORM_VARIABLE
      GLSL_CAMERA_UNIFORM_VARIABLE.projection,
#endif

#ifdef GLSL_CAMERA_UNIFORM_VARIABLE
      GLSL_CAMERA_UNIFORM_VARIABLE.view,
#endif

#if defined(GLSL_VERTEX_ATTRIBUTES_INSTANCING)
      model,
#elif defined(GLSL_MESH_UNIFORM_VARIABLE)
      GLSL_MESH_UNIFORM_VARIABLE.model,
#endif

#ifdef GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE
      GLSL_VERTEX_ATTRIBUTES_POSITION_VARIABLE
#endif
      );
}

#endif
