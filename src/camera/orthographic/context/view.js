import { PerspectiveCameraViewContext } from '../../perspective'
import { assignDefaults } from '../../../utils'
import * as defaults from '../defaults'

export function OrthographicCameraViewContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return PerspectiveCameraViewContext(ctx, initialState)
}
