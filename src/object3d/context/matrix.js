import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

import {
  assertComponentArguments,
  normalizeScaleVector,
  pick,
} from '../../utils'

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
  const transformMatrix = mat4.identity(new Float32Array(16))
  const localMatrix = mat4.identity(new Float32Array(16))
  return ScopedContext(ctx, initialState, {
    matrix(ctx, args) {
      const position = pick('position', [args, initialState, defaults])
      const rotation = pick('rotation', [args, initialState, defaults])
      const scale = normalizeScaleVector(pick('scale', [args, initialState, defaults]))
      // M = T * R * S
      mat4.identity(localMatrix)
      mat4.fromRotationTranslation(localMatrix, rotation, position)
      mat4.scale(localMatrix, localMatrix, scale)
      return localMatrix
    },
    transform(ctx, args) {
      const {transform: parentTransformMatrix} = ctx
      mat4.copy(transformMatrix, localMatrix)
      // M' = Mp * M
      if (parentTransformMatrix) {
        mat4.multiply(transformMatrix, parentTransformMatrix, localMatrix)
      }
      return transformMatrix
    },
  })
}

function compareVectors(a, b) {
  if (a.length != b.length) { return true }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] != b[i]) { return true }
  }
  return false
}

function copy(a, b) {
  for (let i = 0; i < b.length; ++i) {
    a[i] = b[i]
  }
}
