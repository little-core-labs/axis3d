import { assignDefaults } from '../utils'
import { ShaderUniforms } from '../shader'
import { Component } from '../core'
import * as defaults from './defaults'

export class CameraShaderUniforms extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState) {
    assignDefaults(initialState, CameraShaderUniforms.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new ShaderUniforms(ctx, {prefix: `${uniformName}.`}, {
        invertedView({invertedView}) { return invertedView },
        projection({projection}) { return projection },
        aspect({aspect}) { return aspect },
        view({view}) { return view },
        eye({eye}) { return  [...eye] },
    }))
  }
}
