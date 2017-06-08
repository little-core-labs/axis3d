//
// Shader dependencies.
//
#pragma glslify: GeometryContext = require('../../geometry/GeometryContext')

//
// Material implementation header guard.
//
#ifdef useFlatMaterial

//
// Shader entry.
//
#pragma glslify: export(main)
void main() {
  GeometryContext geometry = getGeometryContext();
  gl_FragColor = material.color;

#ifdef HAS_MAP
  if (map.resolution.x > 0.0 && map.resolution.y > 0.0) {
    gl_FragColor = texture2D(map.data, geometry.uv);
  }
#endif

#ifdef HAS_ENV_MAP
  if (envmap.resolution.x > 0.0 && envmap.resolution.y > 0.0) {
    gl_FragColor = texture2D(envmap.data, geometry.uv);
  }
#endif

#ifdef HAS_CUBE_MAP
  gl_FragColor = textureCube(cubemap.data, geometry.localPosition);
#endif

#ifdef HAS_ENV_CUBE_MAP
  gl_FragColor = textureCube(envcubemap.data, geometry.localPosition);
#endif

  gl_FragColor.a = material.opacity;
  if (material.color.a < 1.0) {
    gl_FragColor.a = material.color.a;
  }
}

#endif
