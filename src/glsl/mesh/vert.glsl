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

varying vec3 vLocalPosition;
varying vec3 vLocalNormal;
varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

#ifdef HAS_TRANSFORM_FUNC
  TRANSFORM_FUNC_SOURCE
#endif

#pragma glslify: export(main)
void main() {

#if defined HAS_POSITIONS
  vposition = (mesh.model * vec4(mesh.scale*position, 1.0)).xyz;
  vLocalPosition = position;
  gl_Position =
      camera.projection
    * camera.view
    * mesh.model
    * vec4(mesh.scale*position, 1.0);
#endif

#ifdef HAS_NORMALS
  vnormal = normalize(mesh.modelNormal * normal);
  vLocalNormal = normal;
#endif

#ifdef HAS_UVS
  vuv = uv;
#endif

#ifdef HAS_TRANSFORM_FUNC
  transform();
#endif
}

