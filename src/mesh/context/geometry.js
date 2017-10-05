import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'

export function MeshGeometryContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const {geometry} = initialState
  return ScopedContext(ctx, {
    geometry() { return geometry }
  })
}
