import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'
import { Shader } from '../../shader'

export class MeshShader extends Component {
  static defaults() { return { ...defaults } }
  static createVertexShader({uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    #include <mesh/vertex/main>
    `
  }

  static createFragmentShader({uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    #include <mesh/fragment/main>
    `
  }

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshShader.defaults())
    const {
      uniformName,
      vertexShader = MeshShader.createVertexShader({uniformName}),
      fragmentShader = MeshShader.createFragmentShader({uniformName})
    } = initialState
    super(ctx, new Shader(ctx, {
      vertexShader({vertexShader: vs}) {
        return 'string' == typeof vs ? vs : vertexShader
      },
      fragmentShader({fragmentShader: fs}) {
        return 'string' == typeof fs ? fs : fragmentShader
      },
      ...initialState
    }))
  }
}
