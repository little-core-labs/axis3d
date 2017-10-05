import { assignDefaults } from '../../utils'
import { Shader } from '../../shader'
import * as defaults from '../defaults'

Object.assign(MaterialShader, {
  createFragmentShader({uniformName} = {}) {
    return `
    #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
    #include <material/fragment/main>
    `
  }
})

export function MaterialShader(ctx, initialState = {}) {
  const {createFragmentShader} = MaterialShader
  assignDefaults(initialState, defaults)
  return Shader(ctx, {
    fragmentShader: createFragmentShader(initialState),
    ...initialState
  })
}
