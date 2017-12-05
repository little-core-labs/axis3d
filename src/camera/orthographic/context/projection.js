import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

const scratchMatrix = mat4.identity([])

export function OrthographicCameraProjectionContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    projectionMatrix(ctx, args) {
      const viewport = pick('viewport', [args, ctx, initialState])
      const near = pick('near', [args, ctx, initialState])
      const far = pick('far', [args, ctx, initialState])
      const left = viewport[0]
      const bottom = viewport[1]
      const right = viewport[2]
      const top = viewport[3]
      mat4.ortho(matrix, left, right, bottom, top, near, far)
      return matrix
    }
  })
}
