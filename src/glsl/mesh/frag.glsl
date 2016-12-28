precision mediump float;

/**
 * Shader uniforms.
 */

uniform vec4 color;
uniform float opacity;

#ifdef HAS_MAP
uniform sampler2D map;
uniform bool isMapLoaded;
#endif

/**
 * Shader IO.
 */

#ifdef HAS_POSITIONS
varying vec3 vposition;
#endif

#ifdef HAS_NORMALS
varying vec3 vnormal;
#endif

#if defined(HAS_UVS)
varying vec2 vuv;
#endif

/**
 * Shader entry.
 */

#pragma glslify: export(main)
void main() {
#if defined(HAS_MAP) && defined(HAS_UVS)
  if (isMapLoaded) {
    gl_FragColor = texture2D(map, vec2(1.0 - vuv.x, 1.0 - vuv.y));
  } else {
    discard;
  }
#else
  gl_FragColor = color;
#endif

  // explicit alpha channel
  if (color.a < 1.0) {
    gl_FragColor.a = color.a;
  } else {
    gl_FragColor.a = opacity;
  }
}
