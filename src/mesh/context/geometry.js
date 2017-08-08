import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'

export class MeshGeometryContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MeshGeometryContext.defaults())
    const {geometry} = initialState
    super(ctx, initialState,
      new ScopedContext(ctx, {
        geometry() { return geometry }
      })
    )
  }
}
