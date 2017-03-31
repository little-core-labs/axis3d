#pragma glslify: PositionedLight = require('./PositionedLight')
#pragma glslify: PointLight = require('./PointLight')
#pragma glslify: export(unpack)
PositionedLight unpack(PointLight light) {
  return PositionedLight(
    light.position,
    light.color,
    light.radius,
    light.ambient,
    light.intensity
  );
}
