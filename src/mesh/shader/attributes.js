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
      if (geometry.positions) {
        attributes.position = ctx.regl.buffer(geometry.positions)
      }

      if (geometry.normals) {
        attributes.normal = ctx.regl.buffer(geometry.normals)
      }

      if (geometry.uvs) {
        attributes.uv = ctx.regl.buffer(geometry.uvs)
      }
    }
    super(ctx, initialState, new ShaderAttributes(ctx, attributes))
  }
}
