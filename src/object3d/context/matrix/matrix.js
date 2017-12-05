import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { Entity } from '../../../core'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

import {
  assertComponentArguments,
  normalizeScaleVector,
  pick,
} from '../../../utils'

import { Object3DTranslationMatrixContext } from './translation'
import { Object3DRotationMatrixContext } from './rotation'
import { Object3DScaleMatrixContext } from './scale'
import { Object3DLocalMatrixContext } from './local'
import { Object3DTransformMatrixContext } from './transform'

/**
 * The Object3DMatrixContext component maps input position, rotation, and scale
 * arguments into a matrix and transform context variables. Default values are
 * used if not provided as input arguments to this component function.
 *
 * Object3DMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DMatrixContext', ctx, initialState)
  return Entity(ctx,
    Object3DTranslationMatrixContext(ctx, initialState),
    Object3DRotationMatrixContext(ctx, initialState),
    Object3DScaleMatrixContext(ctx, initialState),
    Object3DLocalMatrixContext(ctx, initialState),
    Object3DTransformMatrixContext(ctx, initialState),
  )
}
