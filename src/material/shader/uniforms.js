import { assignDefaults, ensureRGB, get } from '../../utils'
import { ShaderUniforms } from '../../shader'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MaterialShaderUniforms extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MaterialShaderUniforms.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
        opacity: (ctx, args) => {
          return get('opacity', [args, ctx, initialState ])
        },
        color: (ctx, args) => {
          return ensureRGB(get('color', [ args, ctx, initialState ]))
        },
      })
    )
  }
}
