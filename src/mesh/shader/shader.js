import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'
import { Shader } from '../../shader'

export class MeshShader extends Component {
  static defaults() { return { ...defaults } }
  static createVertexShader({instancing = false, uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    ${!instancing ? '' : `
      #define GLSL_VERTEX_ATTRIBUTES_INSTANCING
      #define GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE1 instanceModel1
      #define GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE2 instanceModel2
      #define GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE3 instanceModel3
      #define GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE4 instanceModel4
    `}
    #include <mesh/vertex/main>
    `
  }

  static createFragmentShader({uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    #include <mesh/fragment/main>
    `
  }

  //GLSL_VERTEX_ATTRIBUTES_INSTANCE_MODEL_VARIABLE
  constructor(ctx, initialState = {}) {
    const {createVertexShader, createFragmentShader} = MeshShader
    assignDefaults(initialState, MeshShader.defaults())
    super(ctx, new Shader(ctx, {
      vertexShader({vertexShader = createVertexShader(initialState)}) {
        return 'string' == typeof vertexShader ? vertexShader : null
      },
      fragmentShader({fragmentShader = createFragmentShader(initialState)}) {
        return 'string' == typeof fragmentShader ? fragmentShader : null
      },
      ...initialState
    }))
  }
}
