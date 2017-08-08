import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

import vec2 from 'gl-vec2'
import vec3 from 'gl-vec3'

export class MeshSizeContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshSizeContext.defaults())
    const computedSizeWeakMap = new WeakMap()
    super(ctx, initialState,
      new ScopedContext(ctx, {
        size({boundingBox, scale}) {
          if (!boundingBox) {
            return [0, 0]
          } else if (computedSizeWeakMap.has(boundingBox)) {
            return computedSizeWeakMap.get(boundingBox)
          }
          if (!scale) { scale = [1, 1, 1] }
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
          computedSizeWeakMap.set(boundingBox, computedSize)
          return computedSize
        }
      })
    )
  }
}
