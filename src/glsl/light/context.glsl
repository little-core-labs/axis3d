#pragma glslify: DirectionalLight = require('./DirectionalLight')
#pragma glslify: AmbientLight = require('./AmbientLight')
#pragma glslify: PointLight = require('./PointLight')

// Exports
#pragma glslify: export(DirectionalLightsContext)
#pragma glslify: export(AmbientLightsContext)
#pragma glslify: export(LightContext)

#ifndef MAX_AMBIENT_LIGHTS
#define MAX_AMBIENT_LIGHTS 16
#endif

struct AmbientLightsContext {
  int count;
  AmbientLight lights[MAX_AMBIENT_LIGHTS];
};

struct DirectionalLightsContext {
  int count;
  DirectionalLight lights[MAX_AMBIENT_LIGHTS];
};

struct PointLightsContext {
  int count;
  PointLight lights[MAX_AMBIENT_LIGHTS];
};

struct LightContext {
  AmbientLightsContext ambient;
  DirectionalLightsContext directional;
  PointLightsContext point;
};
