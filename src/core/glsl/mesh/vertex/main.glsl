#ifndef GLSL_MESH_VERTEX_MAIN
#define GLSL_MESH_VERTEX_MAIN

#ifndef GLSL_MESH_VERTEX_NO_MAIN
#define GLSL_MESH_VERTEX_USE_MAIN

#define GLSL_MESH_UNIFORMS_HAVE_CAMERA
#define GLSL_MESH_UNIFORMS_HAVE_MESH

#define GLSL_MESH_VERTEX_ATTRIBUTES_HAVE_POSITION
#define GLSL_MESH_VERTEX_ATTRIBUTES_HAVE_NORMAL
#define GLSL_MESH_VERTEX_ATTRIBUTES_HAVE_UV

#define GLSL_MESH_VARYING_HAVE_POSITION
#define GLSL_MESH_VARYING_HAVE_NORMAL
#define GLSL_MESH_VARYING_HAVE_UV
#define GLSL_MESH_VARYING_EMIT

#include <common/common>
#include "attributes"
#include "../uniforms"
#include "../varying"

#ifdef GLSL_MESH_VERTEX_TRANSFORM_MAIN_FUNCTION
  void GLSL_MESH_VERTEX_TRANSFORM_MAIN_FUNCTION();
#endif

#ifdef GLSL_MESH_VERTEX_BEFORE_MAIN_FUNCTION
  void GLSL_MESH_VERTEX_BEFORE_MAIN_FUNCTION();
#endif

#ifdef GLSL_MESH_VERTEX_AFTER_MAIN_FUNCTION
  void GLSL_MESH_VERTEX_AFTER_MAIN_FUNCTION();
#endif

void TransformMain() {
#ifdef GLSL_MESH_VERTEX_TRANSFORM_FUNCTION
  GLSL_MESH_VERTEX_TRANSFORM_FUNCTION();
#endif
}

void BeforeMain() {
#ifdef GLSL_MESH_VERTEX_BEFORE_MAIN_FUNCTION
    GLSL_MESH_VERTEX_BEFORE_MAIN_FUNCTION();
#endif
}

void AfterMain() {
#ifdef GLSL_MESH_VERTEX_AFTER_MAIN_FUNCTION
    GLSL_MESH_VERTEX_AFTER_MAIN_FUNCTION();
#endif
}

vec4 worldPosition;
mat3 modelNormal;
mat4 projection;
vec3 scale;
mat4 model;
mat4 view;

void Initialize() {
  worldPosition = vec4(0.0);
  modelNormal = mat3(1.0);
  projection = mat4(1.0);
  scale = vec3(1.0);
  model = mat4(1.0);
  view = mat4(1.0);
}

void Configure() {
#ifdef GLSL_MESH_UNIFORMS_HAVE_CAMERA
  #ifndef GLSL_MESH_VERTEX_NO_PROJECTION
    #ifdef GLSL_CAMERA_USE_PROJETION
      projection = camera.projection;
    #endif
  #endif
#endif

#ifdef GLSL_MESH_UNIFORMS_USE_CAMERA
  #ifdef GLSL_CAMERA_USE_VIEW
    view = camera.view;
  #endif
#endif

#ifdef GLSL_MESH_VERTEX_NO_VIEW
  view = mat4(1.0);
#endif

#ifdef GLSL_MESH_UNIFORMS_HAVE_MESH
  #ifndef GLSL_MESH_VERTEX_NO_MODEL
    #ifdef GLSL_MESH_USE_MODEL
      model = mesh.model;
      modelNormal = mesh.modelNormal;
    #endif
  #endif

  #ifndef GLSL_MESH_VERTEX_NO_SCALE
    #ifdef GLSL_MESH_USE_SCALE
      scale = mesh.scale;
    #endif
  #endif
#endif
}

void SetPosition() {
#ifdef GLSL_MESH_VERTEX_ATTRIBUTES_USE_POSITION
  gl_Position = MeshVertex(projection, view, model, position);
#endif
}

void EmitVarying() {
#ifdef GLSL_MESH_VARYING_EMIT
  #ifdef GLSL_MESH_VERTEX_ATTRIBUTES_USE_POSITION
    #ifdef GLSL_MESH_VARYING_USE_POSITION
      emitVaryingPositions(model, scale, position);
    #endif
  #endif

  #ifdef GLSL_MESH_VERTEX_ATTRIBUTES_USE_NORMAL
    #ifdef GLSL_MESH_VARYING_USE_NORMAL
      emitVaryingNormals(modelNormal, normal);
    #endif
  #endif

  #ifdef GLSL_MESH_VERTEX_ATTRIBUTES_USE_COLOR
    #ifdef GLSL_MESH_VARYING_USE_COLOR
      emitVaryingColors(color);
    #endif
  #endif

  #ifdef GLSL_MESH_VERTEX_ATTRIBUTES_USE_UV
    #ifdef GLSL_MESH_VARYING_USE_UV
      emitVaryingUvs(uv);
    #endif
  #endif
#endif
}

void main() {
  Initialize();
  BeforeMain();
  Configure();
  SetPosition();
  EmitVarying();
  TransformMain();
  AfterMain();
}

#endif
#endif
