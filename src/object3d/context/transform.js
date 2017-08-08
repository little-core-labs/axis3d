import { assignDefaults } from '../../utils'
import { ScopedContext } from '../../scope'
import { Component } from '../../core'
import * as defaults from '../defaults'
import mat4 from 'gl-mat4'

export class Object3DTransformContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Object3DTransformContext.defaults())
    super(ctx, initialState, new ScopedContext(ctx, {
      transform(ctx, args) {
        const {matrix: local, transform: parent} = ctx
        const matrix = mat4.identity([])
        const {transform} = (args || {})
        // M' = Mp * M
        if (parent) { mat4.multiply(matrix, parent, local) }
        // apply external transform from arguments to computed transform
        if (transform) { mat4.multiply(matrix, transform, matrix) }
        return matrix
      },
    }))
  }
}
