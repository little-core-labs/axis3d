import { assignDefaults, isolate } from '../../utils'
import * as defaults from '../defaults'
import { Entity } from '../../core'

import { Object3DMatrixContext } from './matrix'
import { Object3DTRSContext } from './trs'

/**
 * Object3DContext(ctx, initialState) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @return {Function}
 */
export function Object3DContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    Object3DTRSContext(ctx, initialState),
    Object3DMatrixContext(ctx, initialState),
  )
}
