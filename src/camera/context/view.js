import { Object3DTRSContext } from '../../object3d/context'
import { assignDefaults, pick } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'
import quat from 'gl-quat'

const scratchQuaternion = quat.identity([])
const scratchMatrix = mat4.identity([])
const kMat4Identity = mat4.identity([])

export function CameraViewContext(ctx, initialState) {
  assignDefaults(initialState, CameraViewContext.defaults())
  const matrix = new Float32Array(16)
  const previousPosition = new Float32Array(3)
  const previousRotation = new Float32Array(4)
  const previousTarget = new Float32Array(3)
  const previousScale = new Float32Array(3)
  const previousUp = new Float32Array(3)

  mat4.identity(matrix)
  return ScopedContext(ctx, initialState, {
    view(ctx, args) {
      let didDoIdentity = false
      const view = pick('view', [ctx, args])
      if (view) { return view }
      const position = pick('position', [ctx, args])
      const rotation = pick('rotation', [ctx, args])
      const target = pick('target', [ctx, args])
      const scale = pick('scale', [ctx, args])
      const up = pick('up', [ctx, args])

      if (!position || !rotation || !target || !scale) {
        return kMat4Identity
      }

      if (compareVectors(previousPosition, position)) {
        didDoIdentity = true
        mat4.identity(matrix)
        mat4.translate(matrix, matrix, position)
        copy(previousPosition, position)
      }

      if (
        didDoIdentity ||
        compareVectors(previousTarget, target) ||
        compareVectors(previousUp, up)
      ) {
        mat4.lookAt(matrix, target, position, up)
        copy(previousTarget, target)
        copy(previousUp, up)
      }

      if (didDoIdentity || compareVectors(previousRotation, rotation)) {
        quat.normalize(scratchQuaternion, rotation)
        mat4.fromQuat(scratchMatrix, scratchQuaternion)
        mat4.multiply(matrix, matrix, scratchMatrix)
        copy(previousRotation, rotation)
      }

      if (didDoIdentity || compareVectors(previousScale, scale)) {
        mat4.scale(matrix, matrix, scale)
        copy(previousScale, scale)
      }

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
