import { Component, ShaderLib } from '../core'

export class Shader extends Component {
  static defaults() {
    return {
      ...ShaderLib.defaults(),
      defines: {},
    }
  }

  constructor(ctx, initialState = {}) {
    Object.assign(initialState, Shader.defaults(), initialState)
    const { defines, shaderName } = initialState
    const shaderLib = new ShaderLib({ ...initialState, defines })

    let injectParentContext = ctx.regl({})
    let injectContext = null

    let fragmentShaderUncompiled = null
    let vertexShaderUncompiled = null
    let fragmentShader = null
    let vertexShader = null

    const contextCache = {}
    const shaderCache = {}

    super(ctx, initialState, update)
    function update(state, block, previousState) {
      injectParentContext((reglContext) => {
        let {forceCompile = false} = state
        Object.assign(defines, { ...reglContext.defines, ...state.defines })

        if (Object.keys(defines).length) {
          if (shaderLib.preprocessor.define(defines)) {
            forceCompile = true
          }
        }

        if (forceCompile || shouldCompile(reglContext, state)) {
          compile(reglContext, state)
        }

        if ('function' == typeof injectContext) {
          injectContext(state, block)
        } else {
          block(state)
        }
      })
    }

    function compile(reglContext, currentState) {
      const opts = {
        context: {
          fragmentShader: ({fragmentShader: fs}) => fs || fragmentShader,
          vertexShader: ({vertexShader: vs }) => vs || vertexShader,
        }
      }

      const parentOpts = {
        context: {
          defines({defines: contextDefines}) {
            return { ...contextDefines, ...defines }
          }
        }
      }

      if (!isShaderCached(currentState.vertexShader)) {
        compileVertexShader()
      }

      if (!isShaderCached(currentState.fragmentShader)) {
        compileFragmentShader()
      }

      injectParentContext = ctx.regl(parentOpts)

      if ('string' == typeof vertexShader) { opts.vert = vertexShader }
      if ('string' == typeof fragmentShader) { opts.frag = fragmentShader }
      if ('string' == typeof opts.vert || 'string' == typeof opts.frag) {
        const hash = [shaderLib.hash(opts.vert), shaderLib.hash(opts.frag)]
        .filter(Boolean).join('')
        if (null == contextCache[hash]) {
          injectContext = ctx.regl(opts)
          contextCache[hash] = injectContext
        }
      }

      function compileShader(type, shader) {
        let compiled = null
        let uncompiled = null
        if (isViableShader(shader)) {
          uncompiled = getViableShader(reglContext, currentState, shader)
          compiled = shaderLib.compile(`${shaderName} (${type})`, uncompiled)
          compiled = shaderLib.preprocess(compiled)
          return {compiled, uncompiled}
        }
        return null
      }

      function isShaderCached(shader) {
        shader = getViableShader(reglContext, currentState, shader)
        return Boolean(shaderCache[shaderLib.hash(shader)])
      }

      function compileVertexShader() {
        const result = compileShader('vertex', currentState.vertexShader)
        if (result) {
          vertexShader = result.compiled
          vertexShaderUncompiled = result.uncompiled
          shaderCache[shaderLib.hash(vertexShaderUncompiled)] = vertexShader
        }
      }

      function compileFragmentShader() {
        const result = compileShader('fragment', currentState.fragmentShader)
        if (result) {
          fragmentShader = result.compiled
          fragmentShaderUncompiled = result.uncompiled
          shaderCache[shaderLib.hash(fragmentShaderUncompiled)] = fragmentShader
        }
      }
    }

    function getViableShader(reglContext, currentState, shader) {
      if ('string' == typeof shader) { return shader }
      else if ('function' == typeof shader) {
        return shader(reglContext, currentState)
      }
    }

    function isViableShader(shader) {
      return ['string', 'function'].indexOf(typeof shader) > -1
    }

    function shouldCompile(reglContext, currentState) {
      let needsCompile = false
      check('function' != typeof injectContext)
      checkShader(vertexShaderUncompiled, currentState.vertexShader)
      checkShader(fragmentShaderUncompiled, currentState.fragmentShader)
      return needsCompile

      function check(cond) {
        if (cond) { needsCompile = true }
      }

      function checkShader(current, next) {
        let cond = false
        next = getViableShader(reglContext, currentState, next)
        if (shaderCache[shaderLib.hash(next)]) {
          return check(false)
        }
        if ('string' != typeof current && next) {
          return check(true)
        } else if ('string' == typeof next && current != next) {
          return check(true)
        }
      }
    }
  }
}
