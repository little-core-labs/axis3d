import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export class Object3DTransformContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DTransformContext.defaults())
    const matrix = mat4.identity(new Float32Array(16))
    const previousTransform = []
    const previousParent = []
    const previousLocal = []
    super(ctx, initialState, new ScopedContext(ctx, {
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
    }))

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

  }
}
