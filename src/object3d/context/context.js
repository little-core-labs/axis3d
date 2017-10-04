import { Object3DTransformContext } from './transform'
import { assignDefaults, isolate } from '../../utils'
import { Object3DMatrixContext } from './matrix'
import { Object3DTRSContext } from './trs'
import * as defaults from '../defaults'
import { Entity } from '../../core'

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
    isolate(Object3DTRSContext(ctx, initialState)),
    isolate(Object3DMatrixContext(ctx, initialState)),
    isolate(Object3DTransformContext(ctx, initialState)),
  )
}

