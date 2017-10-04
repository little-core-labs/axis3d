import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import computeEyeVector from 'eye-vector'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

/**
 * CameraEyeContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraEyeContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const eye = new Float32Array(3)
  const previousView = new Float32Array(16)
  copy(eye, computeEyeVector(kMat4Identity))
  return ScopedContext(ctx, initialState, {
    eye({view}, args) {
      if (view && compareVectors(previousView, view)) {
        copy(previousView, view)
        copy(eye, computeEyeVector(view))
      }
      return eye
    }
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
