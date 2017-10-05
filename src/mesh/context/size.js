import { assignDefaults, normalizeScaleVector, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'

import vec2 from 'gl-vec2'
import vec3 from 'gl-vec3'

export function MeshSizeContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedContext(ctx, {
    size(ctx, args, batchId) {
      const boundingBox = pick('boundingBox', [args, ctx, defaults])
      const scale = normalizeScaleVector(pick('scale', [args, ctx, defaults]))
      if (!boundingBox) {
        return [0, 0, 0]
      }
      const dimension = boundingBox && boundingBox[0].length
      const min = boundingBox[0]
      const max = boundingBox[1]
      const computedSize = []
      switch (dimension) {
        case 3:
          vec3.subtract(computedSize, max, min);
          vec3.multiply(computedSize, computedSize, scale);
          break
        case 2:
          vec2.subtract(computedSize, max, min);
          vec2.multiply(computedSize, computedSize, scale);
          break
      }
      return computedSize
    }
  })
}
