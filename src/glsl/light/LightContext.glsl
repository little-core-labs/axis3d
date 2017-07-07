/**
 * Module exports.
 */

#pragma glslify: export(DirectionalLightsContext)
#pragma glslify: export(AmbientLightsContext)
#pragma glslify: export(PointLightsContext)

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
 * The total count of all DirectionalLights are in this structure.
 */

struct DirectionalLightsContext {
  int count;
};

/**
 * The total count of all AmbientLights are in this structure.
 */

struct AmbientLightsContext {
  int count;
};

/**
 * The total count of all PointLights are in this structure.
 */

struct PointLightsContext {
  int count;
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
