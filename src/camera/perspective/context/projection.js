import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * PerspectiveCameraProjectionContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function PerspectiveCameraProjectionContext(ctx, initialState = {}) {
  const matrix = alloc(ctx, 16)
  let previousAspect = 0
  let previousNear = 0
  let previousFar = 0
  let previousFov = 0
  return ScopedContext(ctx, initialState, {
    projectionMatrix(ctx, args) {
      if ('projection' in args && args.projection) {
        mat4.copy(matrix, args.projection)
      } else {
        const {viewportWidth, viewportHeight} = ctx
        const aspect = viewportWidth/viewportHeight
        const near = pick('near', [args, defaults, ctx])
        const far = pick('far', [args, defaults, ctx])
        const fov = pick('fov', [args, defaults, ctx])
        if (
          previousAspect != aspect ||
          previousNear != near ||
          previousFar != far ||
          previousFov != fov
        ) {
          previousAspect = aspect
          previousNear = near
          previousFar = far
          previousFov = fov
          mat4.perspective(matrix, fov, aspect, near, far)
        }
      }
      return matrix
    }
  })
}
