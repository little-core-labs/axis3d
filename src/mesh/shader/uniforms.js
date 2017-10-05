import { assignDefaults, isArrayLike, pick } from '../../utils'
import { ShaderUniforms } from '../../shader'
import * as defaults from '../defaults'

import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'

const kMat4Identity = mat4.identity([])
const kMat3Identity = mat3.identity([])

export function MeshShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults.shader)
  const { uniformName } = initialState
  initialState.prefix = `${uniformName}.`
  const buffers = {
    position: new Float32Array(3),
    rotation: new Float32Array(4),
    scale: new Float32Array(3),
    model: new Float32Array(16),
    modelNormal: new Float32Array(9)
  }
  return ShaderUniforms(ctx, { ...initialState }, {
    modelNormal({transform}) {
      copy(buffers.modelNormal, isArrayLike(transform)
        ? mat3.normalFromMat4([], transform) || kMat3Identity
        : kMat3Identity
      )
      return buffers.modelNormal
    },

    model({transform}) {
      copy(buffers.model, isArrayLike(transform)
        ? transform
        : kMat4Identity
      )
      return buffers.model
    },
  })

}

function copy(a, b) {
  for (let i = 0; i < a.length; ++i) {
    a[i] = b[i]
  }
}
