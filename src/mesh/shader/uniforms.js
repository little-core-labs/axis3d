import { assignDefaults, isArrayLike, get } from '../../utils'
import { ShaderUniforms } from '../../shader'
import { Component } from '../../core'
import * as defaults from '../defaults'

import mat4 from 'gl-mat4'
import mat3 from 'gl-mat3'

const kMat4Identity = mat4.identity([])
const kMat3Identity = mat3.identity([])

export class MeshShaderUniforms extends Component {
  static defaults() { return { ...defaults } }

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshShaderUniforms.defaults())
    const {uniformName} = initialState
    initialState.prefix = `${uniformName}.`
    super(ctx, initialState,
      new ShaderUniforms(ctx, initialState, {
        position(ctx, args) {
          return get('position', [ctx, args, initialState])
        },

        rotation(ctx, args) {
          return get('rotation', [ctx, args, initialState])
        },

        scale(ctx, args) {
          return get('scale', [ctx, args, initialState])
        },

        modelNormal({transform}) {
          return isArrayLike(transform)
            ? mat3.normalFromMat4([], transform) || kMat3Identity
            : kMat3Identity
        },

        model({transform}) {
          return isArrayLike(transform)
            ? transform
            : kMat4Identity
        },
      })
    )
  }
}

