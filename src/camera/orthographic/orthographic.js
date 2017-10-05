import { OrthographicCameraContext } from './context'
import { assignDefaults } from '../../utils'
import * as defaults from './defaults'

export function OrthographicCamera(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return OrthographicCameraContext(ctx, initialState)
}
