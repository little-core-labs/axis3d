precision mediump float;

//
// Shader dependcies.
//

#pragma glslify: Camera = require('../camera/Camera')
#pragma glslify: Mesh = require('../mesh/Mesh')

//
// Shader uniforms.
//
uniform Camera camera;
uniform Mesh mesh;

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
  vposition = (mesh.model * vec4(position, 1.0)).xyz;
  gl_Position =
      camera.projection
    * camera.view
    * mesh.model
    * vec4(position, 1.0);
#endif

#ifdef HAS_NORMALS
  vnormal = normalize(mesh.modelNormal * normal);
#endif

#ifdef HAS_UVS
  vuv = uv;
#endif
}
