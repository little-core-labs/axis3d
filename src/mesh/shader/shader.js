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
  const { defines = {} } = initialState
  if (geometry) {
    if (geometry.positions) { defines.GLSL_MESH_HAS_POSITION = true }
    else { defines.GLSL_MESH_NO_POSITION = true }

    if (geometry.normals) { defines.GLSL_MESH_HAS_NORMAL = true }
    else { defines.GLSL_MESH_NO_NORMAL = true }

    if (geometry.uvs) { defines.GLSL_MESH_HAS_UV = true }
    else { defines.GLSL_MESH_NO_UV = true }
  }

  return Shader(ctx, {
    vertexShader({vertexShader: vs}) {
      return 'string' == typeof vs ? vs : vertexShader
    },

    fragmentShader({fragmentShader: fs}) {
      return 'string' == typeof fs ? fs : fragmentShader
    },

    ...initialState,

    defines: { ...initialState.defines, ...defines, },
  })
}
