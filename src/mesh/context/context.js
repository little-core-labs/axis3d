import { assignDefaults, isolate } from '../../utils'
import { MeshBoundingBoxContext } from './bounding-box'
import { MeshGeometryContext } from './geometry'
import { MeshSizeContext } from './size'
import * as defaults from '../defaults'
import { Entity } from '../../core'

export function MeshContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, { ...initialState },
    MeshGeometryContext(ctx, { ...initialState }),
    MeshBoundingBoxContext(ctx, { ...initialState }),
    isolate(MeshSizeContext(ctx, { ...initialState })),
  )
}
