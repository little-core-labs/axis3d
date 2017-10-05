import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'

export function MeshBoundingBoxContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const computedBoundingBoxWeakMap = new WeakMap()
  const {geometry} = initialState
  return ScopedContext(ctx, {
    boundingBox() {
      if (!geometry) {
        return null
      } else if (computedBoundingBoxWeakMap.has(geometry)) {
        return computedBoundingBoxWeakMap.get(geometry)
      } else if ('function' == typeof geometry.computeBoundingBox) {
        const computedBoundingBox = geometry.computeBoundingBox()
        computedBoundingBoxWeakMap.set(geometry, computedBoundingBox)
        return computedBoundingBox
      } else {
        return null
      }
    }
  })
}
