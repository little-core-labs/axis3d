import { ScopedContext } from '../../scope'
import computeEyeVector from 'eye-vector'
import { alloc } from '../../core/buffer'

/**
 * CameraEyeContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraEyeContext(ctx, initialState = {}) {
  const eye = alloc(ctx, 3)
  return ScopedContext(ctx, {
    eye({viewMatrix}) {
      return computeEyeVector(viewMatrix)
    }
  })
}
