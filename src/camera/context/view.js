import { Object3DTRSContext } from '../../object3d/context'
import { assignDefaults, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import { alloc } from '../../core/buffer'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export function CameraViewContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const matrix = mat4.identity(alloc(ctx, 16))
  return ScopedContext(ctx, initialState, {
    viewMatrix(ctx, args) {
      const viewMatrix = pick('viewMatrix', [ctx, args])
      if (viewMatrix) {
        return viewMatrix
      }

      const position = pick('position', [ctx, args])
      const rotation = pick('rotation', [ctx, args])
      const target = pick('target', [ctx, args])
      const scale = pick('scale', [ctx, args])
      const up = pick('up', [ctx, args])

      if (!position || !rotation || !target || !scale) {
        return kMat4Identity
      }

      mat4.identity(matrix)
      mat4.translate(matrix, matrix, position)
      mat4.lookAt(matrix, target, position, up)

      quat.normalize(scratchQuaternion, rotation)
      mat4.fromQuat(scratchMatrix, scratchQuaternion)
      mat4.multiply(matrix, matrix, scratchMatrix)

      return matrix
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
