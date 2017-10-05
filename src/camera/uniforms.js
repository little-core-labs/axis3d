import { assignDefaults } from '../utils'
import { ShaderUniforms } from '../shader'
import * as defaults from './defaults'

/**
 * CameraShaderUniforms(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraShaderUniforms(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {uniformName} = initialState
  return ShaderUniforms(ctx, {prefix: `${uniformName}.`, ...initialState}, {
    invertedView({invertedView}) { return invertedView },
    projection({projection}) { return projection },
    aspect({aspect}) { return aspect },
    view({view}) { return view },
    eye({eye}) { return  eye },
  })
}
