#extension GL_EXT_draw_buffers: require
precision mediump float;

/**
 * Shader uniforms.
 */

#ifdef HAS_ALBEDO
uniform vec4 color;
#endif

/**
 * Shader IO.
 */

#ifdef HAS_NORMALS
varying vec3 vnormal;
#endif

#ifdef HAS_POSITIONS
varying vec3 vposition;
#endif

/**
 * Shader entry.
 */

void main () {
#ifdef HAS_ALBEDO
  gl_FragData[0] = color;
#endif

#ifdef HAS_NORMALS
  gl_FragData[1] = vec4(vnormal, 1.0);
#endif

#ifdef HAS_POSITIONS
  gl_FragData[2] = vec4(vposition, 1.0);
#endif
}
