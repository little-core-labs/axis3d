precision highp float;

/**
 * Shader dependcies.
 */

#pragma glslify: linevoffset = require('screen-projected-lines')

/**
 * Shader uniforms.
 */

uniform float aspect;
uniform float wireframeThickness;
uniform bool wireframe;
uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

/**
 * Shader IO.
 */

#ifdef HAS_NEXT_POSITIONS
attribute vec3 nextPosition;
#endif

#ifdef HAS_DIRECTIONS
attribute float direction;
#endif

#ifdef HAS_POSITIONS
attribute vec3 position;
varying vec3 vposition;
#endif

#ifdef HAS_NORMALS
attribute vec3 normal;
varying vec3 vnormal;
#endif

#if defined(HAS_UVS) && defined(HAS_MAP)
attribute vec2 uv;
varying vec2 vuv;
#endif

/**
 * Shader entry.
 */

#pragma glslify: export(main)
void main() {
  if (wireframe) {
#if defined(HAS_NEXT_POSITIONS) && !defined(HAS_MAP)
    vec4 p = projection * view * model * vec4(position, 1.0);
    vec4 n = projection * view * model * vec4(nextPosition, 1.0);
    vec4 off = linevoffset(p, n, direction, aspect);
    gl_Position = p + off*wireframeThickness;
#endif
  } else {
#if defined HAS_POSITIONS
    gl_Position = projection * view * model * vec4(position, 1.0);
#endif
  }

#if defined HAS_POSITIONS
  vposition = (model * vec4(position, 1.0)).xyz;
#endif

#ifdef HAS_NORMALS
  vnormal = normal;
#endif

#if defined(HAS_UVS) && defined(HAS_MAP)
  vuv = uv;
#endif
}
