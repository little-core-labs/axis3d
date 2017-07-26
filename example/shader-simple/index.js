'use strict'

import {
  PerspectiveCamera,
  BoxGeometry,
  Context,
  ShaderLib,
  Shader,
  Frame,
  MaterialX,
  MeshXAttributes,
  MeshX,
  Mesh,
} from '../../src'

import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import glsl from 'glslify'

const ctx = new Context()

const material = new MaterialX(ctx)
const geometry = new BoxGeometry()
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const stats = new Stats()
const box = new MeshX(ctx, {geometry})

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

const vertexShader = new Shader(ctx, {
  vertexShader: glsl`
  #include <camera/camera>
  #include <mesh/vertex>
  #include <mesh/mesh>

  #include <camera/uniforms>
  #include <mesh/uniforms>

  #include <varying/color>
  #include <varying/emit>

  #include <vertex/attributes/position>
  #include <vertex/attributes/normal>
  #include <vertex/main>

  void Main(inout vec4 vertexPosition, inout VaryingData data) {
    data.color = vec4(0.2, 0.4, 0.5, 1.0);
    vertexPosition = MeshVertex(
      camera.projection,
      camera.view,
      mesh.model,
      position);
  }
  `,

})

const fragmentShader = new Shader(ctx, {
  fragmentShader: glsl`
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform

  #include <mesh/fragment>
  #include <varying/color>
  #include <varying/read>

  #include <fragment/main>

  uniform float time;
  void Main(inout vec4 fragColor, inout VaryingData data) {
    fragColor = MeshFragment(data.color);
  }

  void Transform(inout vec4 fragColor, inout VaryingData data) {
    fragColor.r = 1.0/cos(0.2*time);
  }
  `
})

function scene({cancel}) {
  camera({position: [5, 5, -5]}, () => {
    fragmentShader(() => {
      vertexShader(({vertexShader, fragmentShader}) => {
        console.log(vertexShader, fragmentShader);
        box(() => {
          cancel()
        })
      })
    })
  })
}
