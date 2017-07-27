'use strict'

import {
  PerspectiveCamera,
  BoxGeometry,
  CubeTexture,
  Material,
  Context,
  Texture,
  Shader,
  Entity,
  Frame,
  Mesh,
} from '../../src'

import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import glsl from 'glslify'

const ctx = new Context()

const cubeTexture = new CubeTexture(ctx)
const material = new Material(ctx)
const texture = new Texture(ctx, {})
const geometry = new BoxGeometry()
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const stats = new Stats()
const box = new Mesh(ctx, {geometry})

const bk = new Image(); bk.src = 'assets/criminal-impact_bk.jpg'
const dn = new Image(); dn.src = 'assets/criminal-impact_dn.jpg'
const ft = new Image(); ft.src = 'assets/criminal-impact_ft.jpg'
const lf = new Image(); lf.src = 'assets/criminal-impact_lf.jpg'
const rt = new Image(); rt.src = 'assets/criminal-impact_rt.jpg'
const up = new Image(); up.src = 'assets/criminal-impact_up.jpg'

cubeTexture({ data: [ ft, bk, up, dn, rt, lf ] })

const entity = new Entity(ctx, {
  context: {
    glsl({textureUniformName, cubeTextureUniformName}) {
      let glsl = `
      #define GLSL_FRAGMENT_MAIN_AFTER After
      #include <varying/data>
      #include <time/time>
      `
      let after = `
        void After(inout vec4 fragColor, inout VaryingData data) {
      `
      if (textureUniformName) {
        glsl += `
        #include <varying/uv>
        #include <texture/2d>
        uniform Texture2D ${textureUniformName};
        `
        after += `
          //fragColor = mix(fragColor, texture2D(${textureUniformName}.data, data.uv), 1.0 - cos(1.0 / GetTime()));
          fragColor = texture2D(${textureUniformName}.data, data.uv);
        `
      }

      if (cubeTextureUniformName) {
        glsl += `
        #define GLSL_FRAGMENT_MAIN_AFTER After
        #include <varying/position>
        #include <varying/data>
        #include <texture/cube>
        uniform TextureCube ${cubeTextureUniformName};
        `

        after += `
        fragColor = mix(fragColor, textureCube(${cubeTextureUniformName}.data, data.localPosition), 0.5 + cos(1.0 - (1.0 / GetTime())));
        `
      }

      after += '}'
      return glsl + after
    }
  }
})

const image = new Image()
image.src = '/assets/texture.jpg'
image.onload = () => texture({data: image})

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

const defines = new Shader(ctx, {
  defines: {
    key: 0.5
  }
})

const vertexShader = new Shader(ctx, {
  vertexShader: glsl`

  #define GLSL_VERTEX_MAIN_TRANSFORM Transform
  #include <camera/camera>
  #include <mesh/vertex>
  #include <mesh/mesh>

  #include <camera/uniforms>
  #include <mesh/uniforms>

  #include <varying/position>
  #include <varying/color>
  #include <varying/uv>
  #include <varying/emit>

  #include <time/time>

  #include <vertex/attributes/position>
  #include <vertex/attributes/normal>
  #include <vertex/attributes/uv>
  #include <vertex/main>

  void Main(inout vec4 vertexPosition, inout VaryingData data) {
    data.color = vec4(0.2, 0.4, 0.5, 1.0);
    vertexPosition = MeshVertex(
      camera.projection,
      camera.view,
      mesh.model,
      position);
  }

  void Transform(inout vec4 vertexPosition, inout VaryingData data) {
    float x = 0.5 - (1.0 + cos(GetTime()));
    float y = 0.5 - (1.0 + sin(0.5 - GetTime()));
    float s = 0.5 - cos(1.0 - GetTime());
    vertexPosition.x += s/(x + y);
  }
  `,

})

const fragmentShader = new Shader(ctx, {
  fragmentShader: ({glsl}) => `
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform

  ${glsl || ''}

  #include <mesh/fragment>
  #include <varying/color>
  #include <varying/read>
  #include <time/time>

  #include <fragment/main>

  void Main(inout vec4 fragColor, inout VaryingData data) {
    float time = GetTime();
    fragColor = MeshFragment(data.color);
  }

  void Transform(inout vec4 fragColor, inout VaryingData data) {
    fragColor.r = 1.0/cos(0.2*time);
  }
  `
})

function scene({cancel}) {
  camera({position: [2.5, 2.5, 2.5]}, () => {
    defines(() => {
      texture(() => {
        cubeTexture(() => {
        entity(({foo}) => {
          fragmentShader(() => {
            vertexShader(({vertexShader, fragmentShader}) => {
              //console.log(vertexShader);
              //box({wireframe: true}, () => {
              box(() => {
                //cancel()
              })
            })
            })
          })
        })
      })
    })
  })
}

/**
function scene({cancel}) {
  camera({position: [5, 5, -5]}, () => {
    fragmentShader(() => {
      vertexShader(({vertexShader, fragmentShader}) => {
        box(() => {
          cancel()
        })
      })
    })
  })
}
*/
