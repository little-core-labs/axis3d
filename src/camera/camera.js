import { CameraContext } from './context'

/**
 * Camera(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function Camera(ctx, initialState = {}) {
  return CameraContext(ctx, initialState)
}
