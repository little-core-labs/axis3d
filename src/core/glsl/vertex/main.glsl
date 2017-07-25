#ifndef GLSL_VERTEX_MAIN
#define GLSL_VERTEX_MAIN

#include "../varying/data"

void Main(inout VaryingData data);
void BeforeMain(inout VaryingData varyingData);
void TransformMain(inout VaryingData varyingData);
void AfterMain(inout VaryingData varyingData);
void InitVarying(inout VaryingData varyingData);

void main() {
  VaryingData varyingData = CreateVaryingData();
  BeforeMain(varyingData);
  InitVarying(varyingData);
  Main(varyingData);

#ifdef GLSL_VARYING_EMIT
  EmitVaryingData(varyingData);
#endif

  TransformMain(varyingData);
  AfterMain(varyingData);
}

void BeforeMain(inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_BEFORE
  GLSL_VERTEX_MAIN_BEFORE;
#endif
}

void TransformMain(inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_TRANSFORM
  GLSL_VERTEX_MAIN_TRANSFORM;
#endif
}

void AfterMain(inout VaryingData varyingData) {
#ifdef GLSL_VERTEX_MAIN_AFTER
  GLSL_VERTEX_MAIN_AFTER;
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
