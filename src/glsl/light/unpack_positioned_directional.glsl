#pragma glslify: DirectionalLight = require('./DirectionalLight')
#pragma glslify: PositionedLight = require('./PositionedLight')
#pragma glslify: export(unpack)
PositionedLight unpack(DirectionalLight light) {
  return PositionedLight(
    light.position,
    light.color,
    light.radius,
    light.ambient,
    light.intensity
  );
}
