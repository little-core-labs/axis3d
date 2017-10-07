import {
  CubeTextureShaderUniforms,
  TextureShaderUniforms,
  PerspectiveCamera,
  ScopedContext,
  CubeTexture,
  Geometry,
  Material,
  Context,
  Texture,
  Entity,
  Shader,
  Frame,
  Mesh,
} from '../../src'

import PrimitiveCube from 'primitive-cube'
import ready from 'domready'
import Stats from 'stats.js'
import quat from 'gl-quat'
import vec3 from 'gl-vec3'
import glsl from 'glslify'

const ctx = new Context()

ctx.on('error', (err) => {
  console.log(err.stack || err);
})

const cubeTexture = new CubeTexture(ctx)
const material = new Material(ctx)
const texture = new Texture(ctx)
const geometry = PrimitiveCube()
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

const injectGlsl = new ScopedContext(ctx, {
  glsl({textureUniformName, cubeTextureUniformName}) {
    let includes = ''
    let defines = ''
    let source = ''

    includes += `
      #include <varying/data>
      #include <time/time>
    `

    defines += `
      #define GLSL_FRAGMENT_MAIN_AFTER After
    `

    source += `
      void After(inout vec4 fragColor, inout VaryingData data) {
    `

    if (textureUniformName) {
      includes += `
        #include <varying/uv>
        #include <texture/2d>
      `
      source += `
        fragColor = mix(fragColor, texture2D(${textureUniformName}, data.uv), 0.25);
        //fragColor = texture2D(${textureUniformName}, data.uv);
      `
    }

    if (cubeTextureUniformName) {
      includes += `
        #include <varying/position>
        #include <texture/cube>
      `

      source += `
        fragColor = mix(fragColor, textureCube(${cubeTextureUniformName}, data.localPosition), 0.8);
        //fragColor = textureCube(${cubeTextureUniformName}, data.localPosition);
      `
    }

    includes += `
      #include <texture/uniforms>
    `

    source += `
      }
    `

    return { includes, defines, source }
  }
})

const image = new Image()
image.src = '/assets/texture.jpg'

ready(() => document.body.appendChild(stats.dom))
frame(() => stats.begin())
frame(scene)
frame(() => stats.end())

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
  fragmentShader: ({glsl}) => {
  return `
  #define GLSL_FRAGMENT_MAIN_TRANSFORM Transform

  ${glsl && glsl.defines || ''}
  ${glsl && glsl.includes || ''}

  #include <mesh/fragment>
  #include <varying/color>
  #include <varying/read>
  #include <time/time>


  #include <fragment/main>

  ${glsl && glsl.source  || ''}


  void Main(inout vec4 fragColor, inout VaryingData data) {
    fragColor = MeshFragment(data.color);
  }

  void Transform(inout vec4 fragColor, inout VaryingData data) {
    float x = 0.5 - (1.0 + cos(GetTime()));
    float y = 0.5 - (1.0 + sin(0.5 - GetTime()));
    float s = 0.5 - cos(1.0 - GetTime());
    fragColor.r += s/(x + y);
  }
  `
  }
})

const cubeTextureData = []
const faces = [ft, bk, up, dn, rt, lf]
const to = setInterval(() => {
  const i = (Math.random()*10%(faces.length))|0
  if (!cubeTextureData[i]) {
    console.log('face', i);
    cubeTextureData[i] = faces[i]
  }
  if (faces.filter(Boolean).length == cubeTextureData.length) {
    clearInterval(to)
  }
}, 200)

const rotation = quat.identity([])

const draw = Entity(ctx,
  injectGlsl,
  new CubeTextureShaderUniforms(ctx),
  new TextureShaderUniforms(ctx),
  box,
  fragmentShader,
  vertexShader
)

function scene({cancelAll: cancel, time}) {
  quat.setAxisAngle(rotation, [0, 1, 0], 0.5*time)
  camera({rotation, position: [2.5, 2.5, 2.5]}, () => {
    texture({data: image}, () => {
      cubeTexture({data: cubeTextureData}, () => {
        draw()
      })
    })
  })
}
