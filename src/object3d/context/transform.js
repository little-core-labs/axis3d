import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

/**
 * Object3DTransformContext(ctx, initialState) -> (args, scope) -> Any
 *
 * @public
 * @param {Context}
 * @param {Object} initialState
 * @return {Function}
 */
export function Object3DTransformContext(ctx, initialState = {}) {
  const matrix = mat4.identity(new Float32Array(16))
  const previousTransform = new Float32Array(16)
  const previousParent = new Float32Array(16)
  const previousLocal = new Float32Array(16)
  return ScopedContext(ctx, initialState, {
    transform(ctx, args) {
      const {matrix: local, transform: parent} = ctx
      const {transform} = (args || {})
      // M' = Mp * M
      if (parent) {
        if (
          compareVectors(previousParent, parent) ||
          compareVectors(previousLocal, local)
        ) {
          copy(previousParent, parent)
          copy(previousLocal, local)
          mat4.multiply(matrix, parent, local)
        }
      } else {
        mat4.identity(matrix)
      }

      // apply external transform from arguments to computed transform
      if (transform) {
        if (compareVectors(previousTransform, transform)) {
          copy(previousTransform, transform)
          mat4.multiply(matrix, transform, matrix)
        }
      }
      return matrix
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
