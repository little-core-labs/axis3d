// adapted from https://github.com/freeman-lab/glsl-light-direction/blob/master/index.glsl
#pragma glslify: export(computeDirection)
vec3 computeDirection(vec4 lightPosition, vec3 position) {
  vec3 direction;

  if (lightPosition.w == 0.0) {
    direction = normalize(lightPosition.xyz);
  } else {
    direction = lightPosition.xyz - position;
  }

  return direction;
}
