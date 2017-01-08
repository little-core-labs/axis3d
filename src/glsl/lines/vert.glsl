precision highp float;

//
// Shader dependcies.
//
#pragma glslify: linevoffset = require('screen-projected-lines')

//
// Shader uniforms.
//
uniform float aspect;
uniform mat4 projection;
uniform mat4 model;
uniform mat3 modelNormal;
uniform mat4 view;
uniform float time;
uniform float thickness;

//
// Shader IO.
//
attribute vec3 nextPosition;
attribute float direction;
attribute vec3 position;
attribute vec3 normal;

varying vec3 vposition;
varying vec3 vnormal;
varying vec2 vuv;

vec3 lerp(vec3 a, vec3 b, float t) {
  return vec3(
    a.x + t * (b.x - a.x),
    a.y + t * (b.y - a.y),
    a.z + t * (b.z - a.z)
  );
}

//
// Shader entry.
//
#pragma glslify: export(main)
void main() {
  // @TODO(werle) - abstract to geomorping interface
  //float p = random(position.xy);
  //vec3 pos = lerp(position, position + vec3(p, p, p), cos(0.5*time));

  // @TODO(werle) - abstract to geomorping interface
  //float np = random(nextPosition.yz);
  //vec3 npos = lerp(nextPosition, nextPosition + vec3(np, np, np), sin(0.1*time));
  vec4 linePosition = projection * view * model * vec4(position, 1.0);
  vec4 nextLinePosition = projection * view * model * vec4(nextPosition, 1.0);
  vec4 lineOffset = linevoffset(
      linePosition,
      nextLinePosition,
      direction, aspect);

  gl_Position = linePosition + lineOffset*thickness;

  // GeometryContext
  vposition = (model * vec4(position, 1.0)).xyz;
  vnormal = normalize(modelNormal * normal);
}
