import { Entity, ShaderLib } from '../core'
import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { ShaderDefines } from './defines'
import { UpdateContext } from '../update'

/**
 * Shader(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @return {Function}
 */
export function Shader(ctx, initialState = {}) {
  assignDefaults(initialState, ShaderLib.defaults())
  const { shaderName = 'shader' } = initialState
  const contextCache = {}
  const shaderCache = {}
  const shaderLib = new ShaderLib({ ...initialState })
  const getContext = ctx.regl({})

  let didDefinesChange = false
  let injectContext = getContext

  let fragmentShaderUncompiled = null
  let vertexShaderUncompiled = null
  let fragmentShader = null
  let vertexShader = null

  let hashMap = {}

  return Entity(ctx, initialState,
    ShaderDefines(ctx, initialState, initialState.defines),
    (args, next) => {
      getContext(args, update)
      return injectContext(args, next)
    },
  )

  function update(reglContext, args) {
    args = args || {}
    let {forceCompile = false} = args
    const {defines} = reglContext

    if (defines && Object.keys(defines).length) {
      if (shaderLib.preprocessor.define(defines)) {
        didDefinesChange = true
        forceCompile = true
      }
    }

    if (forceCompile || shouldCompile(reglContext, args)) {
      compile(reglContext, args)
    }

    setInjectContext(reglContext, args)
    didDefinesChange = false
  }

  function hash(str) {
    if (hashMap[str]) { return hashMap[str] }
    return (hashMap[str] = shaderLib.hash(str))
  }

  function getShaderFromCache(reglContext, currentState, shader) {
    shader = getViableShader(reglContext, currentState, shader)
    return shaderCache[hash(shader)]
  }

  function setInjectContext(reglContext, currentState) {
    const opts = {
      context: {
        fragmentShader: ({fragmentShader: fs}) => fragmentShader || fs,
        vertexShader: ({vertexShader: vs }) => vertexShader || vs,
      }
    }

    if (!currentState.fragmentShader && !currentState.vertexShader) {
      return
    }

    const requestedFragmentShader = getShaderFromCache(
      reglContext,
      currentState,
      currentState.fragmentShader)

    const requestedVertexShader = getShaderFromCache(
      reglContext,
      currentState,
      currentState.vertexShader)

    if (!requestedVertexShader && !requestedFragmentShader) {
      return
    }

    if (requestedFragmentShader && requestedFragmentShader != fragmentShader) {
      fragmentShader = requestedFragmentShader
    }

    if (requestedVertexShader && requestedVertexShader != vertexShader) {
      vertexShader = requestedVertexShader
    }

    if ('string' == typeof fragmentShader) {
      opts.frag = fragmentShader
    }

    if ('string' == typeof vertexShader) {
      opts.vert = vertexShader
    }

    if ('string' == typeof opts.vert || 'string' == typeof opts.frag) {
      if (injectContext && injectContext.opts) {
        if (injectContext.opts.vert == opts.vert) {
          if (injectContext.opts.frag == opts.frag) {
            return
          }
        }
      }
      const id = ((o) => [o.vert||'', o.frag||''].map(hash).join(''))(opts)
      if (null == contextCache[id]) {
        injectContext = ctx.regl(opts)
        contextCache[id] = injectContext
        injectContext.opts = opts
      } else if (contextCache[id] != injectContext) {
        injectContext = contextCache[id]
      }
    }
  }

  function compile(reglContext, currentState) {
    if (didDefinesChange || !isShaderCached(currentState.vertexShader)) {
      compileVertexShader()
    }

    if (didDefinesChange || !isShaderCached(currentState.fragmentShader)) {
      compileFragmentShader()
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
      return Boolean(getShaderFromCache(reglContext, currentState, shader))
    }

    function compileVertexShader() {
      const result = compileShader('vertex', currentState.vertexShader)
      if (result) {
        vertexShader = result.compiled
        vertexShaderUncompiled = result.uncompiled
        shaderCache[hash(vertexShaderUncompiled)] = vertexShader
      }
    }

    function compileFragmentShader() {
      const result = compileShader('fragment', currentState.fragmentShader)
      if (result) {
        fragmentShader = result.compiled
        fragmentShaderUncompiled = result.uncompiled
        shaderCache[hash(fragmentShaderUncompiled)] = fragmentShader
      }
    }
  }

  function getViableShader(reglContext, currentState, shader) {
    const {defines} = shaderLib
    let source = null
    if ('string' == typeof shader) {
      source = shader
    } else if ('function' == typeof shader) {
      source = shader(reglContext, currentState)
    }
    return source
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
      if (shaderCache[hash(next)]) {
        return check(false)
      } else if ('string' != typeof current && 'string' == typeof next) {
        return check(true)
      } else if ('string' == typeof next && current != next) {
        return check(true)
      }
    }
  }
}
