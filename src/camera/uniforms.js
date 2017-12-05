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
  const {uniformName = defaults.uniformName} = initialState
  return ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
    aspect({viewportWidth: w, viewportHeight: h}) { return w/h },
    eye({eye}) { return  eye },

    invertedView({invertedViewMatrix}) { return invertedViewMatrix },
    projection({projectionMatrix}) { return projectionMatrix },
    view({viewMatrix}) { return viewMatrix },
  })
}
