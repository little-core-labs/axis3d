import { CameraInverseViewContext } from './inverse-view'
import { assignDefaults, isolate } from '../../utils'
import { CameraInfoContext } from './info'
import { CameraViewContext } from './view'
import { CameraEyeContext } from './eye'
import { Object3DContext } from '../../object3d'
import * as defaults from '../defaults'
import { Entity } from '../../core'

/**
 * CameraContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraContext(ctx, initialState) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    Object3DContext(ctx, initialState),
    CameraInfoContext(ctx, initialState),
    CameraViewContext(ctx, initialState),
    CameraInverseViewContext(ctx, initialState),
    CameraEyeContext(ctx, initialState),
  )
}
