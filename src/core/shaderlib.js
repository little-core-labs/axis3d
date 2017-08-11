import { DynamicValue } from './dynamic'
import { Component } from './component'
import * as libglsl from './glsl'

import { dirname, extname, resolve } from 'path'
import glslTokensToDefines from 'glsl-token-defines'
import glslTokensToString from 'glsl-token-string'
import injectDefines from 'glsl-inject-defines'
import glslTokenize from 'glsl-tokenizer'
import preprocess from 'prepr'
import coalesce from 'defined'

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

const kDefaultShaderLibPrecision = 'mediump float'
const kDefaultShaderLibVersion = '100'
const kDefaultShaderName = '<anonymous>'

export class ShaderLib {
  static defaults() {
    return {
      precision: kDefaultShaderLibPrecision,
      shaderName: kDefaultShaderName,
      version: kDefaultShaderLibVersion,
      defines: {},
      name: kDefaultShaderName,
    }
  }

  constructor({
    preprocessor = undefined,
    middleware = [],
    precision = kDefaultShaderLibPrecision,
    version = kDefaultShaderLibVersion,
    defines = {},
    glsl,
  } = {}) {
    this.cache = new DynamicValue(this)
    this.store = new DynamicValue(this)
    this.version = coalesce(version || kDefaultShaderLibVersion)
    this.precision = coalesce(precision, kDefaultShaderLibPrecision)
    this.middleware = coalesce(middleware, [])
    this.preprocessor = coalesce(preprocessor, new ShaderLibPreprocessor(this))
    this.preprocessor.define(defines)
    this.add({ ...libglsl, ...glsl })
  }

  get defines() {
    const {defines = null} = this.preprocessor || {}
    return defines
  }

  define(key, value) {
    return this.preprocessor.define(key, value)
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
    return 'string' == typeof this.cache[this.hash(source) || '']
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
    if (!name) { name = kDefaultShaderName }
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
      + '\n'
    this.cache.set(hash, source)
    return source
  }

  use(middleware) {
    if ('function' == typeof middleware) {
      this.middleware.push(middleware)
    }
    return this
  }
}

export class ShaderLibPlugin extends Component { }

export class ShaderLibPreprocessor {
  constructor(shaderLib) {
    this.defines = new DynamicValue(this)
    this.shaderLib = shaderLib
    this.middleware = []
  }

  define(key, value) {
    if ('object' == typeof key) {
      return Object.keys(key)
        .map((k) => this.define(k, key[k]))
        .some((v) => true === v)
    } else if ('string' == typeof key) {
      // boolean -> number
      if (true === value) { value = 1 }
      else if (false === value) { value = 0 }
      if (null != value) {
        // any -> string
        value = String(value)
        if (value != this.defines[key]) {
          this.defines.set(key, value)
          return true
        } else {
          return false
        }
      }
    }
    return false
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
    if ('string' == typeof source) {
      source = injectDefines(source, { ...defines, ...opts.defines })
    }
    visit(`\n${source}\n`, stack, name != kDefaultShaderName ? dirname(name) : '/')
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
                const path = arg.replace(/^["|<](.*)["|>]/, '$1').trim()
                const left = arg[0].trim()
                const right = arg[arg.trim().length - 1].trim()
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

          default: push(); break
        }
      }
    }
  }
}
