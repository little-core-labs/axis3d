//
// Shader dependencies.
//
#pragma glslify: GeometryContext = require('../../geometry/GeometryContext')

//
// Material implementation header guard.
//
#ifdef useFlatMaterial

#ifdef HAS_ENVIRONMENT_MAP
// adapted from https://github.com/regl-project/regl/blob/gh-pages/example/theta360.js
vec4 lookupEnv(vec3 dir) {
  float PI = 3.14;
  float lat = atan(dir.z, dir.x);
  float lon = acos(dir.y / length(dir));
  vec2 envLoc = vec2(0.5 + lat / (2.0 * PI), lon / PI);

  return texture2D(envmap.data, envLoc);
}
#endif

#ifdef HAS_ENVIRONMENT_CUBE_MAP
vec4 lookupCubeEnv(vec3 dir) {
  return textureCube(envmap.data, -dir);
}
#endif

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
#elif defined HAS_CUBE_MAP
  gl_FragColor = textureCube(map.data, geometry.localPosition);
#endif

#ifdef HAS_ENVIRONMENT_MAP
  mat4 invertedView = camera.invertedView;
  vec3 iv = invertedView[3].xyz / invertedView[3].w;
  vec3 eye = normalize(geometry.position.xyz - iv);
  vec3 rdir = reflect(eye, geometry.normal);

  vec4 reflectivity = lookupEnv(rdir);
  gl_FragColor = gl_FragColor + reflectivity;

#elif defined HAS_ENVIRONMENT_CUBE_MAP
  mat4 invertedView = camera.invertedView;
  vec3 iv = invertedView[3].xyz / invertedView[3].w;
  vec3 eye = normalize(geometry.position.xyz - iv);
  vec3 rdir = reflect(eye, geometry.normal);

  vec4 reflectivity = lookupCubeEnv(rdir);
  gl_FragColor = gl_FragColor + reflectivity;
#endif

  gl_FragColor.a = material.opacity;
  if (material.color.a < 1.0) {
    gl_FragColor.a = material.color.a;
  }
}

#endif
