import { assertComponentArguments, normalizeScaleVector, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * The Object3DScaleMatrixContext component maps input scale,
 * rotation, and scale arguments into context variables. Default values
 * are used if not provided as input arguments to this component function.
 *
 * Object3DScaleMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DScaleMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DScaleMatrixContext', ctx, initialState)
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    scaleMatrix({}, args) {
      const scale = pick('scale', [args, initialState, defaults])
      mat4.identity(matrix)
      return mat4.scale(matrix, matrix, normalizeScaleVector(scale))
    }
  })
}
