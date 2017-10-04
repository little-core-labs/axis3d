import { assignDefaults, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

const scratchMatrix = mat4.identity([])

export function OrthographicCameraProjectionContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, initialState, {
    projection(ctx, args) {
      const projection = mat4.identity(scratchMatrix)
      const viewport = pick('viewport', [args, ctx, initialState])
      const near = pick('near', [args, ctx, initialState])
      const far = pick('far', [args, ctx, initialState])
      const left = viewport[0]
      const bottom = viewport[1]
      const right = viewport[2]
      const top = viewport[3]
      mat4.ortho(projection, left, right, bottom, top, near, far)
      return projection
    }
  })
}
