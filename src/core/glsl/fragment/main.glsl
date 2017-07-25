#ifndef GLSL_FRAGMENT_MAIN
#define GLSL_FRAGMENT_MAIN

#include "../varying/data"
#include "../varying/read"

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
  TransformMain(varyingData);
  AfterMain(varyingData);
}

void BeforeMain(inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_BEFORE
  GLSL_FRAGMENT_MAIN_BEFORE;
#endif
}

void TransformMain(inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_TRANSFORM
  GLSL_FRAGMENT_MAIN_TRANSFORM;
#endif
}

void AfterMain(inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_AFTER
  GLSL_FRAGMENT_MAIN_AFTER;
#endif
}

void InitVarying(inout VaryingData varyingData) {
  varyingData = ReadVaryingData();
}

#endif
