import { CameraInverseViewContext } from './inverse-view'
import { CameraInfoContext } from './info'
import { CameraViewContext } from './view'
import { CameraEyeContext } from './eye'
import { Object3DContext } from '../../object3d'
import { Entity } from '../../core'

import { CameraMatrixContext } from './matrix'

/**
 * CameraContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraContext(ctx, initialState) {
  return Entity(ctx, initialState,
    Object3DContext(ctx, initialState),
    CameraInfoContext(ctx, initialState),
    CameraViewContext(ctx, initialState),
    CameraInverseViewContext(ctx, initialState),
    CameraEyeContext(ctx, initialState),
  )
}
