import { MeshBoundingBoxContext } from './bounding-box'
import { MeshGeometryContext } from './geometry'
import { MeshSizeContext } from './size'
import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MeshContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshContext.defaults())
    super(ctx, initialState,
      new MeshGeometryContext(ctx, initialState),
      new MeshBoundingBoxContext(ctx, initialState),
      new MeshSizeContext(ctx, initialState),
    )
  }
}
