import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import { alloc } from '../../core/buffer'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

/**
 * CameraInverseViewContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraInverseViewContext(ctx, initialState) {
  const invertedViewMatrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    invertedViewMatrix({viewMatrix}) {
      return mat4.invert(invertedViewMatrix, viewMatrix)
    }
  })
}
