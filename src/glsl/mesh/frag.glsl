precision mediump float;

varying vec3 vnormal;

#pragma glslify: export(main)
void main() {
  gl_FragColor = vec4(vnormal, 1.0);
}
