import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

/**
 * CameraInverseViewContext(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {Object} initialState
 * @return {Function}
 */
export function CameraInverseViewContext(ctx, initialState) {
  assignDefaults(initialState, defaults)
  const invertedView = new Float32Array(16)
  const previousView = new Float32Array(16)
  mat4.identity(invertedView)
  return ScopedContext(ctx, initialState, {
    invertedView({view}) {
      if (view && compareVectors(previousView, view)) {
        copy(previousView, view)
        mat4.invert(invertedView, view)
      }
      return invertedView
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
