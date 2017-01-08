precision highp float;

//
// Shader dependcies.
//

//
// Shader uniforms.
//
uniform float aspect;
uniform mat4 projection;
uniform mat4 model;
uniform mat3 modelNormal;
uniform mat4 view;
uniform float time;

//
// Shader IO.
//

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

#pragma glslify: export(main)
void main() {

#if defined HAS_POSITIONS
  gl_Position = projection * view * model * vec4(position, 1.0);
  vposition = (model * vec4(position, 1.0)).xyz;
#endif

#ifdef HAS_NORMALS
  vnormal = normalize(modelNormal * normal);
#endif

#ifdef HAS_UVS
  vuv = uv;
#endif
}
