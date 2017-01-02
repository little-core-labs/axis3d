precision mediump float;

//
// Shader uniforms.
//

uniform sampler2D map;
uniform vec2 mapResolution;
uniform float opacity;
uniform vec4 color;

//
// Shader IO.
//

varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

//
// Shader entry.
//

#pragma glslify: export(main)
void main() {
  if (mapResolution.x > 0.0 && mapResolution.y > 0.0) {
    gl_FragColor = texture2D(map, 1.0 - vuv);
  } else {
    gl_FragColor = color;
  }

  // explicit alpha channel
  if (color.a < 1.0) {
    gl_FragColor.a = color.a;
  } else {
    gl_FragColor.a = opacity;
  }
}
