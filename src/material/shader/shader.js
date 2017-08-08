import { assignDefaults } from '../../utils'
import { Component } from '../../core'
import { Shader } from '../../shader'
import * as defaults from '../defaults'

export class MaterialShader extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MaterialShader.defaults())
    const {uniformName, fragmentShader = null} = initialState
    super(ctx, initialState,
      new Shader(ctx, {
        fragmentShader: ({fragmentShader}) => {
          if (fragmentShader) { return fragmentShader }
          return `
          #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
          #include <material/fragment/main>
          `
        }
      })
    )
  }
}
