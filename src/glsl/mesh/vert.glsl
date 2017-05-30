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

varying float vangle;
varying vec3 vreflection;
varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

#ifdef HAS_TRANSFORM_FUNC
  TRANSFORM_FUNC_SOURCE
#endif

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
  // vec3 derp = vec3(mesh.modelNormal);
  // vnormal = normalize(derp);
  // vnormal = normalize(normal);
  vnormal = normalize(mesh.modelNormal * normal);
#endif

#ifdef HAS_UVS
  vuv = uv;
#endif

// adapted from https://github.com/regl-project/regl/blob/gh-pages/example/theta360.js
#ifdef HAS_REFLECTION


  // vreflection = camera.view.xyz - gl_Position.xyz;


  mat4 invertedView = camera.invertedView;
  vec3 iv = invertedView[3].xyz / invertedView[3].w;
  vec3 eye = normalize(vposition.xyz - iv);
  // vec3 eye = normalize(camera.eye);
  vangle = dot(camera.eye, normal);
  // eye.x = -eye.x;
  // vreflection = cos(dot(camera.eye, normal));
  // vreflection = eye;
  // vreflection = eye;
  vreflection = reflect(eye, vnormal);



#endif

#ifdef HAS_TRANSFORM_FUNC
  transform();
#endif
}

