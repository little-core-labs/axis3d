#pragma glslify: LambertMaterial = require('./LambertMaterial')
#pragma glslify: export(toLambertMaterial)
#define toLambertMaterial(m) LambertMaterial(m.emissive, m.ambient, m.color, m.roughness, m.opacity, m.albedo, m.type)
