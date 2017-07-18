#pragma glslify: export(Fog)
struct Fog {
  bool enabled;
  vec4 color;
  //exp, exp2
  float density;
  // linear
  float near;
  float far;
  int type; // 0=linear, 1=exp, 2=exp2
};
