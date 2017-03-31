/**
 * Module dependencies.
 */

#pragma glslify: computeOrennNayarDiffuse = require('glsl-diffuse-oren-nayar')

#pragma glslify: LambertMaterial = require('../material/LambertMaterial')
#pragma glslify: GeometryContext = require('../geometry/GeometryContext')
#pragma glslify: PositionedLight = require('./PositionedLight')
#pragma glslify: Camera = require('../camera/Camera')

/**
 * Module exports.
 */

#pragma glslify: export(computeDiffuseFromGeometryWithDirection)

/**
 * Computes the diffuse intensity value relative to a given positioned
 * light source and a geometry with a given direction.
 */

float computeDiffuseFromGeometryWithDirection(PositionedLight light,
                                              GeometryContext geometry,
                                              Camera camera,
                                              LambertMaterial material,
                                              vec3 direction)
{
  vec3 viewpoint = normalize(camera.eye - geometry.position);
  float diffuse = computeOrennNayarDiffuse(
      normalize(direction),
      viewpoint,
      geometry.normal,
      material.roughness,
      material.albedo);

  diffuse =
    (diffuse < 0.0 || 0.0 < diffuse || diffuse == 0.0)
    ? diffuse : 0.0;

  return diffuse;
}
