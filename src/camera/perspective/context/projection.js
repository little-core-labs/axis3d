import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export function PerspectiveCameraProjectionContext (ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const matrix = new Float32Array(16)
  let previousAspect = 0
  let previousNear = 0
  let previousFar = 0
  let previousFov = 0
  return ScopedContext(ctx, initialState, {
    projection(ctx, args) {
      if ('projection' in args && args.projection) {
        mat4.copy(matrix, args.projection)
      } else {
        const aspect = pick('aspect', [args, ctx])
        const near = pick('near', [args, ctx])
        const far = pick('far', [args, ctx])
        const fov = pick('fov', [args, ctx])
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
