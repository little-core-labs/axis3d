#pragma glslify: export(VaryingData)
#ifndef GLSL_VARYING_DATA
#define GLSL_VARYING_DATA

struct VaryingData {
  // exported
  vec3 localPosition;
  vec3 localNormal;
  vec3 position;
  vec3 normal;
  vec4 color;
  vec2 uv;

  // private
  mat3 modelNormal;
  mat4 model;
  vec3 scale;
};

VaryingData CreateVaryingData() {
  VaryingData data;
  data.localPosition = vec3(0.0);
  data.localNormal = vec3(0.0);
  data.position = vec3(0.0);
  data.normal = vec3(0.0);
  data.color = vec4(0.0);
  data.uv = vec2(0.0);

  data.modelNormal = mat3(1.0);
  data.model = mat4(1.0);
  data.scale = vec3(1.0);
  return data;
}

#endif
