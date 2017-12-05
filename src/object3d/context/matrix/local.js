import { assertComponentArguments, pick } from '../../../utils'
import { ScopedContext } from '../../../scope'
import * as defaults from '../../defaults'
import { alloc } from '../../../core/buffer'
import mat4 from 'gl-mat4'

/**
 * The Object3DLocalMatrixContext component maps input position,
 * rotation, and scale arguments into context variables. Default values
 * are used if not provided as input arguments to this component function.
 *
 * Object3DLocalMatrixContext(ctx) -> ScopedContext(ctx) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?(Object} [initialState = {}]
 * @return {Function}
 * @throws BadArgumentError
 * @throws MissingContextError
 */
export function Object3DLocalMatrixContext(ctx, initialState = {}) {
  assertComponentArguments('Object3DLocalMatrixContext', ctx, initialState)
  const matrix = mat4.identity(alloc(ctx, 16))
  const kIdentityMatrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    localMatrix({
      translationMatrix = kIdentityMatrix,
      rotationMatrix = kIdentityMatrix,
      scaleMatrix = kIdentityMatrix
    }) {
      mat4.identity(matrix)
      if (translationMatrix) {
        mat4.multiply(matrix, matrix, translationMatrix)
      }

      if (rotationMatrix) {
        mat4.multiply(matrix, matrix, rotationMatrix)
      }

      if (scaleMatrix) {
        mat4.multiply(matrix, matrix, scaleMatrix)
      }
      return matrix
    }
  })
}
