import { ShaderAttributes } from '../../shader'
import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MeshShaderAttributes extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, MeshShaderAttributes.defaults())
    const {geometry} = initialState
    const attributes = {}
    if (geometry) {
      attributes.position = geometry.positions || null
      attributes.normal = geometry.normals || null
      attributes.uv = geometry.uvs || null
    }
    super(ctx, initialState, new ShaderAttributes(ctx, attributes))
  }
}
