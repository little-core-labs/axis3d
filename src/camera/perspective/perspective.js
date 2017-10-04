import { PerspectiveCameraContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'

export function PerspectiveCamera (ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return PerspectiveCameraContext(ctx, initialState)
}
