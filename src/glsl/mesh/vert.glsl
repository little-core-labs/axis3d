precision highp float;

/**
 * Shader dependcies.
 */

/**
 * Shader uniforms.
 */

uniform float aspect;
uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

/**
 * Shader IO.
 */

#ifdef HAS_POSITIONS
attribute vec3 position;
varying vec3 vposition;
#endif

#ifdef HAS_NORMALS
attribute vec3 normal;
varying vec3 vnormal;
#endif

#ifdef HAS_UVS
attribute vec2 uv;
varying vec2 vuv;
#endif

#ifdef HAS_DIRECTIONS
attribute float direction;
#endif

#ifdef HAS_NEXT_POSITIONS
attribute vec3 nextPosition;
#endif

/**
 * Shader entry.
 */

#pragma glslify: export(main)
void main() {
  vec4 pos = vec4(0.0);

#ifdef HAS_POSITIONS
  pos = projection * view * model * vec4(position, 1.0);
#elif defined HAS_NORMALS
  pos = projection * view * model * vec4(normal, 1.0);
#elif defined HAS_UVS
  pos = projection * view * model * vec4(uv, 0.0, 1.0);
#endif

  gl_Position = pos;

#ifdef HAS_POSITIONS
  vposition = (model * vec4(position, 1.0)).xyz;
#endif

#ifdef HAS_NORMALS
  vnormal = normal;
#endif

#ifdef HAS_UVS
  vuv = uv;
#endif
}
