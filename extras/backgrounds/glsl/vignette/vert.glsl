precision mediump float;
attribute vec2 position;
varying vec2 vuv;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
  vuv = position;
}
