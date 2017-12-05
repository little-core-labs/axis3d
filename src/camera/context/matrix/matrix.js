import { CameraInverseViewMatrixContext } from './view'
import { CameraProjectionMatrixContext } from './view'
import { CameraViewMatrixContext } from './view'

/**
 * CameraMatrixContext(ctx, initialState) -> (args, scope) -> Any
 */
export function CameraMatrixContext(ctx, initialState) {
  return Entity(ctx,
    CameraViewMatrixContext(ctx, initialState),
    CameraInverseViewMatrixContext(ctx, initialState),
    CameraProjectionMatrixContext(ctx, initialState)
  )
}
