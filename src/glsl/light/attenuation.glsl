// adapted from https://github.com/freeman-lab/glsl-light-attenuation/blob/master/index.glsl
#pragma glslify: export(computeAttenuation)
float computeAttenuation(vec4 position, vec3 direction, float radius) {
  float attenuation;
  float angle;

  if (0.0 == position.w) {
    attenuation = 1.0;
  } else {
    attenuation = pow(clamp(1.0 - length(direction)/radius, 0.0, 1.0), 2.0);
  }

  return attenuation;
}
