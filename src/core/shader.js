'use strict'

import { DynamicValue } from './gl'
import * as libglsl from './glsl'
import { Command } from './command'
import { Entity } from './entity'

import { dirname, extname, resolve } from 'path'
import glslTokensToDefines from 'glsl-token-defines'
import glslTokensToString from 'glsl-token-string'
import injectDefines from 'glsl-inject-defines'
import CommentRegExp from 'comment-regex'
import glslTokenize from 'glsl-tokenizer'
import preprocess from 'prepr'
import coalesce from 'defined'

const kDefaultShaderLibVersion = '100'
const kDefaultShaderLibPrecision = 'mediump float'
const kAnonymousShaderName = '<anonymous>'

const kGLSLTokenPreprocecsor = 'preprocessor'
const kGLSLTokenBlockComment = 'block-comment'
const kGLSLTokenLineComment = 'line-comment'
const kGLSLTokenWhitespace = 'whitespace'
const kGLSLTokenIdentifier = 'ident'
const kGLSLTokenOperator = 'operator'
const kGLSLTokenBuiltin = 'builtin'
const kGLSLTokenKeyword = 'keyword'
const kGLSLTokenInteger = 'integer'
const kGLSLTokenFloat = 'float'
const kGLSLTokenEOF = 'eof'

export class Shader extends Entity {
  constructor(ctx, initialState = {}) {
    const {
      defines = {},
      precision = 'mediump float',
      shaderLib = new ShaderLib({ ...initialState, precision, defines }),
    } = initialState

    let injectContext = null

    let fragmentShaderUncompiled = null
    let vertexShaderUncompiled = null
    let fragmentShader = null
    let vertexShader = null

    super(ctx, initialState, update)
    function update(state, block, previousState) {
      const {forceCompile = false} = state
      Object.assign(defines, { ...state.defines })
      shaderLib.preprocessor.define(defines)
      if (true === forceCompile || shouldCompile(state, previousState)) {
        compile()
      }
      if ('function' == typeof injectContext) {
        //Object.assign(state, {vertexShader, fragmentShader})
        injectContext(state, block)
      } else {
        block(state)
      }
    }

    function compile() {
      const opts = {
        context: {
          get vertexShader() { return vertexShader },
          get fragmentShader() { return fragmentShader }
        }
      }
      if ('string' == typeof vertexShader) { opts.vert = vertexShader }
      if ('string' == typeof fragmentShader) { opts.frag = fragmentShader }
      if ('string' == typeof opts.vert || 'string' == typeof opts.frag) {
        injectContext = ctx.regl(opts)
      }
    }

    function shouldCompile(currentState, previousState) {
      let needsCompile = false
      const shaderName = `${kAnonymousShaderName} (vertex)`

      check('function' != typeof injectContext)
      checkShader(
        vertexShaderUncompiled,
        currentState.vertexShader,
        compileVertexShader)
      checkShader(
        fragmentShaderUncompiled,
        currentState.fragmentShader,
        compileFragmentShader)

      return needsCompile
      function check(cond, block) {
        if (cond) {
          needsCompile = true
          block && block()
        }
      }

      function checkShader(current, next, block) {
        let cond = false
        if ('string' != typeof current && 'string' == typeof next) {
          return check(true, block)
        } else if ('string' == typeof next && current != next) {
          return check(true, block)
        }
      }

      function compileVertexShader() {
        if ('string' == typeof currentState.vertexShader) {
          vertexShaderUncompiled = currentState.vertexShader
          vertexShader = shaderLib.compile(shaderName, vertexShaderUncompiled)
          vertexShader = shaderLib.preprocess(vertexShader)
        }
      }

      function compileFragmentShader() {
        if ('string' == typeof currentState.fragmentShader) {
          fragmentShaderUncompiled = currentState.fragmentShader
          fragmentShader = shaderLib.compile(shaderName, fragmentShaderUncompiled)
          fragmentShader = shaderLib.preprocess(fragmentShader)
        }
      }
    }
  }
}

export class ShaderLib {
  constructor({
    preprocessor = null,
    middleware = [],
    precision = kDefaultShaderLibPrecision,
    version = kDefaultShaderLibVersion,
    defines = {},
    glsl,
  } = {}) {
    this.cache = new DynamicValue(this)
    this.store = new DynamicValue(this)
    this.version = version || kDefaultShaderLibVersion
    this.precision = coalesce(precision, kDefaultShaderLibPrecision)
    this.middleware = coalesce(middleware, [])
    this.preprocessor = preprocessor || new ShaderLibPreprocessor(this)
    this.preprocessor.define(defines)
    this.add({ ...libglsl, ...glsl })
    console.log(this);
  }

  get defines() {
    const {defines = null} = this.preprocessor || {}
    return defines
  }

  define(key, value) {
    this.preprocessor.define(key, value)
    return this
  }

  injectShaderNameDefine(name, source) {
    const regex =
      /\s?#ifndef SHADER_NAME\s?\n#define SHADER_NAME\s?.*\n#endif\n?$/g
    return String(source).replace(regex, '')
  }

  injectShaderPrecision(source) {
    const {precision = kDefaultShaderLibPrecision} = this
    const header = `precision ${precision};`
    const regex =
      /[\s|\t]?precision\s+([a-z]+)\s+([a-z|A-Z]+)[\s+]?;[\s|\t|\r]?/g
    source = source
      .replace(header, '')
      .replace(regex, '')
    return `${header}\n${source}`
  }

  add(name, source) {
    if ('string' == typeof name && 'string' == typeof source) {
      name = name.replace(/[\/]+/g, '/')
      this.store.set(name, source)
    } else if (name && 'object' == typeof name) {
      const walk = (stack, scope) => {
        for (const key in scope) {
          stack.push(key)
          if ('object' == typeof scope[key]) { walk(stack, scope[key]) }
          else { this.add(stack.join('/'), scope[key]) }
          stack.pop()
        }
      }
      walk([], name)
    }
    return this
  }

  get(path) {
    if ('string' == typeof path) {
      if ('string' == typeof this.store[path]) {
        return this.compile(path, this.store[path])
      }
    }
    return null
  }

  resolve(path, root = './') {
    root = resolve('/', root)
    path = path.replace(extname(path), '')
    path = resolve(root, path).slice(1)
    return path
  }

  hash(source) {
    return 'string' != typeof source ? null : String(source)
      .split('')
      .map((c) => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0)
      .toString('16')
  }

  isCached(source) {
    if ('string' == typeof this.store[this.hash(source)]) {
      return true
    }
    return false
  }

  preprocess(source) {
    const {defines} = this
    let whitespace = 0
    source = preprocess(source, defines)
    source = source
      .split('\n')
      .filter((line) => false == /^\s*$/.test(line))
      .join('\n')
    return source
  }

  compile(name, source) {
    if (!source && name) { source = name; name = null }
    if (!name) { name = kAnonymousShaderName }
    if (!source) { return null }
    const hash = this.hash(source)
    if (this.cache[hash]) { return this.cache[hash] }
    source = this.injectShaderNameDefine(name, source)
    source = this.preprocessor.process(name, source)
    source = this.injectShaderPrecision(source)
    source = source
      .split('\n')
      .filter((line) => line.length)
      .map((line) => 1 == line.length ? `${line}\n` : line)
      .join('\n')
    this.cache.set(hash, source)
    return `${source}\n`
  }

  use(middleware) {
    if ('function' == typeof middleware) {
      this.middleware.push(middleware)
    }
    return this
  }
}

export class ShaderLibPlugin extends Command { }

/*shaderLib.use(new ShaderLibPlugin((shaderLib, this, src, opts)) => {

})*/

export class ShaderLibPreprocessor {
  constructor(shaderLib) {
    this.defines = new DynamicValue(this)
    this.shaderLib = shaderLib
    this.middleware = []
  }

  define(key, value) {
    if ('string' == typeof key) {
      // boolean -> number
      if (true === value) { value = 1 }
      else if (false === value) { value = 0 }
      if (null != value) {
        // any -> string
        value = String(value)
        this.defines.set(key, value)
      }
    } else if ('object' == typeof key) {
      for (const k in key) { this.define(k, key[k]) }
    }
    return this
  }

  undefine(key) {
    this.defines.unset(key)
    return this
  }

  process(name, source, opts = {}) {
    const { shaderLib, defines } = this
    const { middleware, version } = shaderLib
    const includeStack = []
    const stack = []
    opts = !opts || 'object' != typeof opts ? {} : opts
    // inject shader defines and optional provided defines
    if ('string' == typeof source) {
      source = injectDefines(source, { ...defines, ...opts.defines })
    }
    visit(source, stack, name != kAnonymousShaderName ? dirname(name) : '/')
    source = glslTokensToString(stack)
    return middleware
      .filter((ware) => 'function' == typeof ware)
      .reduce((src, ware) => {
        return coalesce(ware(shaderLib, this, src, opts), src)
      }, source)
      .replace('#define GLSLIFY 1\n', '')

    function visit(source, stack, root) {
      const tokens = glslTokenize(source, {version})
      for (const token of tokens) {
        const push = () => stack.push(token)
        switch (token.type) {
          case kGLSLTokenBlockComment:
          case kGLSLTokenLineComment:
            break
          case kGLSLTokenWhitespace:
          case kGLSLTokenIdentifier:
          case kGLSLTokenOperator:
          case kGLSLTokenBuiltin:
          case kGLSLTokenInteger:
          case kGLSLTokenKeyword:
          case kGLSLTokenInteger:
          case kGLSLTokenFloat:
          case kGLSLTokenEOF:
            push()
            break

          case kGLSLTokenPreprocecsor:
            const includeRegex = RegExp(/[\s|\t]?#include[\s]+([<|"]?.*[>|"]?)$/)
            const directive = token.data.match(/(#[a-z]+)\s?/)[0].trim()
            switch (directive) {
              case '#define':
                const match = token.data.match(/#define[\s]+(.*)/)
                if (match) {
                  const kv = match[1].match(/.*[\s]+(.*)/)
                  if (!kv) { token.data = `${token.data} 1` }
                }
                push()
                break

              case '#include':
                const [statement, arg] = token.data.match(includeRegex) || []
                const path = arg.replace(/^["|<](.*)["|>]/, '$1')
                const left = arg[0]
                const right = arg[arg.length - 1]
                const createError = (ErrorType, msg) => new ErrorType(
                  `${msg || ''}\n\tat (glsl) ${includeStack.join('\n\tat (glsl) ')}`
                )
                if (-1 == ['<', '"'].indexOf(left)) {
                  const msg = `Unexpected token '${left}'. Expecting '<' or '"'.`
                  throw createError(SyntaxError, msg)
                } else if (-1 == ['>', '"'].indexOf(right)) {
                  const expected = '<' == left ? `'>'` : `'"'`
                  const msg = `Unexpected token '${right}'. Expecting ${expected}.`
                  throw createError(SyntaxError, msg)
                }

                if ('<' == left && '>' != right) {
                  const msg = `Unexpected token '${right}'. Expecting '>'.`
                  throw createError(SyntaxError, msg)
                } else if ('"' == left && '"' != right) {
                  const msg = `Unexpected token '${right}'. Expecting '"'.`
                  throw createError(SyntaxError, msg)
                }

                const nextRoot = '<' == left && '>' == right ? '/' : root
                const prefix = '.' != path[0] ? './' : ''
                const resolvedPath = shaderLib.resolve(`${prefix}${path}`, nextRoot)
                const shader = shaderLib.get(resolvedPath)
                if (shader) {
                  includeStack.push(`${path}:${token.line}`)
                  visit(shader + '\n', stack, nextRoot)
                } else {
                  throw createError(ReferenceError, `glsl lib ${arg} not found.`)
                }
                includeStack.pop()
                break

              default: push()
            }
            break

          default:
            break
        }
      }
    }
  }
}
