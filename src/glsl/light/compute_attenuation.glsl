/**
 * Module dependencies.
 */

#pragma glslify: PositionedLight = require('./PositionedLight')

/**
 * Module exports.
 */

#pragma glslify: export(computeAttenuation)

/**
 * Computes a positioned light source attenuation for a given
 * direction vector.
 * Adapted from {@link https://github.com/freeman-lab/glsl-light-attenuation/blob/master/index.glsl}
 */

float computeAttenuation(PositionedLight light, vec3 direction) {
  float attenuation;
  if (0.0 == light.position.w) {
    attenuation = 1.0;
  } else {
    attenuation = pow(
      clamp(1.0 - length(direction)/light.radius, 0.0, 1.0),
      2.0);
  }
  return attenuation;
}
