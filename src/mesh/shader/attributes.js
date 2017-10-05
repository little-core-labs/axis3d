import { ShaderAttributes } from '../../shader'
import { assignDefaults } from '../../utils'
import * as defaults from '../defaults'

export function MeshShaderAttributes(ctx, initialState) {
  assignDefaults(initialState, defaults.shader)
  const {geometry} = initialState
  const { attributes = {} } = initialState
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
  return ShaderAttributes(ctx, attributes)
}
