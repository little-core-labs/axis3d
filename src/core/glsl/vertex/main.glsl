#ifndef GLSL_VERTEX_MAIN
#define GLSL_VERTEX_MAIN

#include "../varying/data"

void BeforeMain(inout vec4 vertexPosition, inout VaryingData varyingData);
void Main(inout vec4 vertexPosition, inout VaryingData data);
void TransformMain(inout vec4 vertexPosition, inout VaryingData varyingData);
void AfterMain(inout vec4 vertexPosition, inout VaryingData varyingData);

void InitVarying(inout VaryingData varyingData);

void main() {
  VaryingData varyingData = CreateVaryingData();
  InitVarying(varyingData);
  BeforeMain(gl_Position, varyingData);
  Main(gl_Position, varyingData);
  TransformMain(gl_Position, varyingData);

#ifdef GLSL_VARYING_EMIT
  EmitVaryingData(varyingData);
#endif

  AfterMain(gl_Position, varyingData);
}

#ifdef GLSL_VERTEX_MAIN_BEFORE
  void GLSL_VERTEX_MAIN_BEFORE(inout vec4 vertexPosition, inout VaryingData varyingData);
#endif

#ifdef GLSL_VERTEX_MAIN_TRANSFORM
  void GLSL_VERTEX_MAIN_TRANSFORM(inout vec4 vertexPosition, inout VaryingData varyingData);
#endif

#ifdef GLSL_VERTEX_MAIN_AFTER
  void GLSL_VERTEX_MAIN_AFTER(inout vec4 vertexPosition, inout VaryingData varyingData);
#endif

void BeforeMain(inout vec4 vertexPosition, inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_BEFORE
  GLSL_VERTEX_MAIN_BEFORE(vertexPosition, varyingData);
#endif
}

void TransformMain(inout vec4 vertexPosition, inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_TRANSFORM
  GLSL_VERTEX_MAIN_TRANSFORM(vertexPosition, varyingData);
#endif
}

void AfterMain(inout vec4 vertexPosition, inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_AFTER
  GLSL_VERTEX_MAIN_AFTER(vertexPosition, varyingData);
#endif
}

void InitVarying(inout VaryingData varyingData) {
  #ifdef GLSL_VERTEX_ATTRIBUTES_POSITION
    varyingData.position = position;
  #endif

  #ifdef GLSL_VERTEX_ATTRIBUTES_NORMAL
    varyingData.normal = normal;
  #endif

  #ifdef GLSL_VERTEX_ATTRIBUTES_COLOR
    varyingData.color = color;
  #endif

  #ifdef GLSL_VERTEX_ATTRIBUTES_UV
    varyingData.uv = uv;
  #endif

  #if defined(GLSL_MESH) && defined(GLSL_MESH_UNIFORMS)
    varyingData.modelNormal = mesh.modelNormal;
    varyingData.model = mesh.model;
    varyingData.scale = mesh.scale;
  #endif
}

#endif
