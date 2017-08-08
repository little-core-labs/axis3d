import { assignDefaults } from '../../utils'
import { ShaderDefines } from '../../shader'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MeshShaderDefines extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshShaderDefines.defaults())
    super(ctx, initialState,
      new ShaderDefines(ctx, {
        GLSL_MESH_HAS_POSITION({geometry}) {
          if (geometry.positions) { return true }
          return null
        },

        GLSL_MESH_HAS_NORMAL({geometry}) {
          if (geometry.normals) { return true }
          return null
        },

        GLSL_MESH_HAS_UV({geometry}) {
          if (geometry.uvs) { return true }
          return null
        }
      })
    )
  }
}
