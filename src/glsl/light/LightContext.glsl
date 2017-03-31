/**
 * Module dependencies.
 */

#pragma glslify: DirectionalLight = require('./DirectionalLight')
#pragma glslify: AmbientLight = require('./AmbientLight')
#pragma glslify: PointLight = require('./PointLight')

/**
 * Module exports.
 */

#pragma glslify: export(DirectionalLightsContext)
#pragma glslify: export(AmbientLightsContext)
#pragma glslify: export(LightContext)

// @TODO(werle) inject these defines at runtime
#ifndef MAX_SPOT_LIGHTS
#define MAX_SPOT_LIGHTS 16
#endif

#ifndef MAX_POINT_LIGHTS
#define MAX_POINT_LIGHTS 16
#endif

#ifndef MAX_AMBIENT_LIGHTS
#define MAX_AMBIENT_LIGHTS 16
#endif

#ifndef MAX_DIRECTIONAL_LIGHTS
#define MAX_DIRECTIONAL_LIGHTS 16
#endif

/**
 * The SpotLightsContext structure encapsulates all known
 * SpotLights for a shader program. The total count and pointers
 * toall SpotLights are in this structure.
 */

// @TODO(werle) - implement this
//struct SpotLightsContext {
  //int count;
  //SpotLight lights[MAX_SPOT_LIGHTS];
//};

/**
 * The DirectionalLightsContext structure encapsulates all known
 * DirectionalLights for a shader program. The total count and pointers
 * toall DirectionalLights are in this structure.
 */

struct DirectionalLightsContext {
  int count;
  DirectionalLight lights[MAX_DIRECTIONAL_LIGHTS];
};

/**
 * The AmbientLightsContext structure encapsulates all known
 * AmbientLights for a shader program. The total count and pointers
 * toall AmbientLights are in this structure.
 */

struct AmbientLightsContext {
  int count;
  AmbientLight lights[MAX_AMBIENT_LIGHTS];
};

/**
 * The PointLightsContext structure encapsulates all known
 * PointLights for a shader program. The total count and pointers
 * toall PointLights are in this structure.
 */

struct PointLightsContext {
  int count;
  PointLight lights[MAX_POINT_LIGHTS];
};

/**
 * The LightContext structure encapsulates all possible lights by
 * providing light contexts for ambient, directional, point, and
 * spot light types.
 */

struct LightContext {
  DirectionalLightsContext directional;
  AmbientLightsContext ambient;
  PointLightsContext point;
};
