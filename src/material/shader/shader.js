import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import { Shader } from '../../shader'
import * as defaults from '../defaults'

export class MaterialShader extends Component {
  static defaults() { return { ...defaults } }
  static createFragmentShader({uniformName} = {}) {
    return `
    #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
    #include <material/fragment/main>
    `
  }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MaterialShader.defaults())
    const {
      uniformName,
      fragmentShader = MaterialShader.createFragmentShader({uniformName})
    } = initialState
    super(ctx, initialState,
      new Shader(ctx, {
        glsl: initialState.glsl || {},
        fragmentShader: fragmentShader,
        ...initialState
      })
    )
  }
}
