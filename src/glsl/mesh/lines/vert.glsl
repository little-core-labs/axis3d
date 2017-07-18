precision mediump float;

//
// Shader dependcies.
//
#pragma glslify: Camera = require('../../camera/Camera')
#pragma glslify: Mesh = require('../Mesh')
#pragma glslify: linevoffset = require('screen-projected-lines')

//
// Shader uniforms.
//
uniform Mesh mesh;
uniform Camera camera;
uniform float time;
uniform float thickness;

//
// Shader IO.
//
attribute vec3 nextPosition;
attribute float direction;
attribute vec3 position;
attribute vec3 normal;

varying vec3 vLocalPosition;
varying vec3 vLocalNormal;
varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

//
// Shader entry.
//
#pragma glslify: export(main)
void main() {
  vec4 linePosition =
      camera.projection
    * camera.view
    * mesh.model
    * vec4(position, 1.0)
    ;

  vec4 nextLinePosition =
      camera.projection
    * camera.view
    * mesh.model
    * vec4(nextPosition, 1.0)
    ;

  vec4 lineOffset = linevoffset(
      linePosition,
      nextLinePosition,
      direction, camera.aspect);

  gl_Position = linePosition + lineOffset*thickness;

  // GeometryContext
  vposition = (mesh.model * vec4(position, 1.0)).xyz;
  vnormal = normalize(mesh.modelNormal * normal);
  vLocalPosition = position;
  vLocalNormal = normal;
}
