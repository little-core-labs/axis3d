import { ensureRGBA, ensureRGB, get } from '../utils'
import { defaults as setInitialState } from '../utils'
import { UniformsComponent } from './components/uniforms'
import { ContextComponent} from './components/context'
import { Component } from './component'
import { Shader } from './shader'

export class Material extends Component {
  static defaults() {
    return {
      ...super.defaults(),
      uniformName: 'material',
      opacity: 1,
      color: [100/255, 110/255, 255/255],
      blending: { equation: 'add', enable: true, color: [0, 0, 0, 1],
                  func: { src: 'src alpha', dst: 'one minus src alpha' } },
      culling: { enable: false, face: 'back' },
      depth: { enable: true, range: [0, 1], func: 'less', mask: true }
    }
  }

  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Material.defaults())
    super(ctx, initialState,
      new MaterialShader(ctx, initialState),
      new MaterialState(ctx, initialState),
      new MaterialContext(ctx, initialState),
      new MaterialUniforms(ctx, initialState),
    )
  }
}

export class MaterialShader extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Material.defaults())
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

export class MaterialState extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Material.defaults())
    super(ctx, initialState,
      ctx.regl({
        blend: {
          equation: (ctx, args) => get('equation', [
            args.blending,
            ctx.blending,
            initialState.blending
          ]),

          color: (ctx, args) => get('color', [
            args.blending,
            ctx.blending,
            initialState.blending
          ]),

          enable: (ctx, args) => get('enable', [
            args.blending,
            ctx.blending,
            initialState.blending
          ]),

          func: (ctx, args) => get('func', [
            args.blending,
            ctx.blending,
            initialState.blending
          ]),
        },

        cull: {
          enable: (ctx, args) => Boolean(get('enable', [
            args.culling,
            ctx.culling,
            initialState.culling
          ])),

          face: (ctx, args) => String(get('face', [
            args.culling,
            ctx.culling,
            initialState.culling
          ])),
        },
        depth: {
          enable: (ctx, args) => Boolean(get('enable', [
            args.depth,
            ctx.depth,
            initialState.depth
          ])),

          range: (ctx, args) => get('range', [
            args.depth,
            ctx.depth,
            initialState.depth
          ]),

          func: (ctx, args) => get('func', [
            args.depth,
            ctx.depth,
            initialState.depth
          ]),

          mask: (ctx, args) => get('mask', [
            args.depth,
            ctx.depth,
            initialState.depth
          ]),
        }
      })
    )
  }
}

export class MaterialContext extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Material.defaults())
    super(ctx, initialState, new ContextComponent(ctx, {
      color: (ctx, args) => get('color', [args, initialState]),
      opacity: (ctx, args) => get('opacity', [args, initialState]),
    }))
  }
}

export class MaterialUniforms extends Component {
  constructor(ctx, initialState = {}) {
    setInitialState(initialState, Material.defaults())
    const {uniformName} = initialState
    super(ctx, initialState,
      new UniformsComponent(ctx, {prefix: `${uniformName}.`}, {
        opacity: (ctx, args) => {
          return get('opacity', [args, ctx, initialState ])
        },
        color: (ctx, args) => {
          return ensureRGB(get('color', [ args, ctx, initialState ]))
        },
      })
    )
  }
}
