import { assignDefaults } from '../../utils'
import * as defaults from '../defaults'
import { Shader } from '../../shader'

Object.assign(MeshShader, {
  createVertexShader({uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    #include <mesh/vertex/main>
    `
  },

  createFragmentShader({uniformName} = {}) {
    return `
    #define GLSL_MESH_UNIFORM_VARIABLE ${uniformName}
    #include <mesh/fragment/main>
    `
  }
})

export function MeshShader(ctx, initialState = {}) {
  assignDefaults(initialState, defaults.shader)
  const {
    uniformName,
    geometry,
    vertexShader = MeshShader.createVertexShader({uniformName}),
    fragmentShader = MeshShader.createFragmentShader({uniformName})
  } = initialState
  return Shader(ctx, {
    vertexShader({vertexShader: vs}) {
      return 'string' == typeof vs ? vs : vertexShader
    },

    fragmentShader({fragmentShader: fs}) {
      return 'string' == typeof fs ? fs : fragmentShader
    },

    ...initialState,

    defines: {
      GLSL_MESH_HAS_POSITION() {
        if (geometry && geometry.positions) { return true }
        return null
      },

      GLSL_MESH_HAS_NORMAL() {
        if (geometry && geometry.normals) { return true }
        return null
      },

      GLSL_MESH_HAS_UV() {
        if (geometry && geometry.uvs) { return true }
        return null
      },

      ...initialState.defines
    },
  })
}
