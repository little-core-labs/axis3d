precision highp float;

/**
 * Shader dependcies.
 */

#pragma glslify: linevoffset = require('screen-projected-lines')

//
// Shader uniforms.
//

uniform float aspect;
uniform float wireframeThickness;
uniform bool wireframe;
uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

//
// Shader IO.

#ifdef HAS_NEXT_POSITIONS
attribute vec3 nextPosition;
#endif

#ifdef HAS_DIRECTIONS
attribute float direction;
#endif

#ifdef HAS_POSITIONS
attribute vec3 position;
#endif

#ifdef HAS_NORMALS
attribute vec3 normal;
#endif

#ifdef HAS_UVS
attribute vec2 uv;
#endif

varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

/**
 * Shader entry.
 */

#pragma glslify: export(main)
void main() {
#if defined(HAS_NEXT_POSITIONS)
  if (wireframe) {
    vec4 p = projection * view * model * vec4(position, 1.0);
    vec4 n = projection * view * model * vec4(nextPosition, 1.0);
    vec4 off = linevoffset(p, n, direction, aspect);
    gl_Position = p + off*wireframeThickness;
  } else
#endif
  {
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

#ifdef HAS_UVS
  vuv = uv;
#endif
}
