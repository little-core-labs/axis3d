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

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshShader.defaults())
    super(ctx, new Shader(ctx, {
      glsl: initialState.glsl || {},
      vertexShader({vertexShader}) {
        const {uniformName} = initialState
        if ('string' == typeof vertexShader) { return vertexShader }
        else if ('string' == typeof initialState.vertexShader) {
          return initialState.vertexShader
        } else { return MeshShader.createVertexShader({uniformName}) }
      },
      ...initialState
    }))
  }
}
