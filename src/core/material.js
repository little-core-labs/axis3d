import { UniformsComponent } from './components/uniforms'
import { ContextComponent} from './components/context'
import { ensureRGBA,  get } from '../utils'
import { Component } from './component'
import { Shader } from './shader'

export class Material extends Component {
  static defaults() {
    return {
      ...super.defaults(),
      uniformName: 'material',
      opacity: 1,
      color:  [100/255, 110/255, 255/255],
      blending: {
        equation: 'add',
        enable: true,
        color: [0, 0, 0, 1],
        func: { src: 'src alpha', dst: 'one minus src alpha' },
      },
      culling: {
        enable: false,
        face: 'back',
      },
      depth: {
        enable: true,
        range: [0, 1],
        func: 'less',
        mask: true,
      }
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Material.defaults(), initialState)
    super(ctx, initialState,
      new MaterialShader(ctx, initialState),
      new MaterialState(ctx, initialState),
      new MaterialContext(ctx, initialState),
      new MaterialUniforms(ctx, initialState),
    )
  }
}

export class MaterialShader extends Shader {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Material.defaults(), initialState)
    const {uniformName, fragmentShader = null} = initialState
    super(ctx, {
      fragmentShader: ({fragmentShader}) => {
        if (fragmentShader) { return fragmentShader }
        return `
        #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
        #include <material/material>
        #include <material/uniforms>
        #include <texture/2d>
        #include <texture/cube>
        #include <varying/uv>
        #include <varying/read>
        #include <varying/data>
        #include <mesh/fragment>
        void main() {
          gl_FragColor = MeshFragment(
            ${uniformName}.color,
            ${uniformName}.opacity);
        }
        `
      },
      ...initialState
    })
  }
}

export class MaterialState extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Material.defaults(), initialState)
    super(ctx, initialState, ctx.regl({
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
        enable: (ctx, args) => get('enable', [
          args.culling,
          ctx.culling,
          initialState.culling
        ]),

        face: (ctx, args) => get('face', [
          args.culling,
          ctx.culling,
          initialState.culling
        ]),
      },
      depth: {
        enable: (ctx, args) => get('enable', [
          args.depth,
          ctx.depth,
          initialState.depth
        ]),

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
    }))
  }
}

export class MaterialContext extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Material.defaults(), initialState)
    super(ctx, initialState, new ContextComponent(ctx, {
      color: (ctx, args) => get('color', [args, ctx, initialState]),
      opacity: (ctx, args) => get('opacity', [args, ctx, initialState]),
    }))
  }
}

export class MaterialUniforms extends Component {
  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Material.defaults(), initialState)
    const {uniformName} = initialState
    super(ctx, initialState, new UniformsComponent(ctx, {
      [`${uniformName}.opacity`]: (ctx, args) => get('opacity', [
        ctx,
        args,
        initialState
      ]),

      [`${uniformName}.color`]: (ctx, args) => ensureRGBA(get('color', [
        ctx,
        args,
        initialState
      ])).slice(0, 3),
    }))
  }
}
