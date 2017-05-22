//
// Shader dependencies.
//
#pragma glslify: GeometryContext = require('../../geometry/GeometryContext')

//
// Material implementation header guard.
//
#ifdef useReflectionMaterial

//
// Shader entry.

// adapted from https://github.com/regl-project/regl/blob/gh-pages/example/theta360.js
//
#pragma glslify: export(main)

vec4 lookupEnv(vec3 dir) {
  float PI = 3.14;
  float lat = atan(dir.z, dir.x);
  float lon = acos(dir.y / length(dir));
  vec2 envLoc = vec2(0.5 + lat / (2.0 * PI), lon / PI);

  return texture2D(envmap.data, envLoc);
}

void main() {
  GeometryContext geometry = getGeometryContext();

  gl_FragColor = lookupEnv(geometry.reflection);

  gl_FragColor.a = material.opacity;
  if (material.color.a < 1.0) {
    gl_FragColor.a = material.color.a;
  }
}

#endif
