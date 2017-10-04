import { assignDefaults, ensureRGB, pick } from '../../utils'
import { ShaderUniforms } from '../../shader'
import * as defaults from '../defaults'

export function MaterialShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
    opacity(ctx, args)  {
      return pick('opacity', [args, ctx, initialState ])
    },

    color(ctx, args) {
      return ensureRGB(pick('color', [ args, ctx, initialState ]))
    },
  })
}
