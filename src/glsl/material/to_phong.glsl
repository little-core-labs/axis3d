#pragma glslify: PhongMaterial = require('./PhongMaterial')
#pragma glslify: export(toPhongMaterial)
#define toPhongMaterial(m) PhongMaterial(m.specular, m.emissive, m.ambient, m.color, m.shininess, m.roughness, m.opacity, m.albedo, m.type)
