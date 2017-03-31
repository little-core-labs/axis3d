// adapted from https://github.com/freeman-lab/glsl-light-direction/blob/master/index.glsl
#pragma glslify: export(compute)
vec3 compute(vec4 lightPosition, vec3 position) {
  if (lightPosition.w == 0.0) {
    return normalize(lightPosition.xyz);
  } else {
    return lightPosition.xyz - position;
  }
}
