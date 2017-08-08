import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MeshBoundingBoxContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshBoundingBoxContext.defaults())
    const computedBoundingBoxWeakMap = new WeakMap()
    super(ctx, initialState,
      new ScopedContext(ctx, {
        boundingBox({geometry}) {
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
    )
  }
}
