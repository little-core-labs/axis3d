precision mediump float;

/**
 * Shader IO.
 */

attribute vec2 position;
varying vec2 vuv;

/**
 * Shader entry.
 */

void main() {
  vuv = 0.5*(position + 1.0);
  gl_Position = vec4(position, 0, 1);
}
