'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from './stats'
import { EventEmitter } from 'events'

import events from 'dom-events'
import glsl from 'glslify'
import regl from 'regl'

export const defaults = {
  clear: {
    // @TODO(werle) - use a color module
    color: [17/255, 17/255, 17/255, 1],
    depth: 1,
  },
}

module.exports = exports = (state, opts) =>
  new Context({...defaults, ...state}, opts)

export class Context extends EventEmitter {
  constructor(initialState = {}, opts = {}, createRegl = regl) {
    registerStat('Context')
    super()

    this._stack = []
    this._state = { ...initialState }
    this._caller = null
    this._scope = null
    this._hasFocus = false
    this._reglContext = null

    this.setMaxListeners(Infinity)
    opts.regl = opts.regl || opts.gl || {}

    if (opts.element && 'CANVAS' == opts.element.nodeName) {
      opts.regl.canvas = opts.element
    } else if (opts.element && opts.element.nodeName) {
      opts.regl.container = opts.element
    } else if ('string' == typeof opts.element) {
      opts.regl.container = opts.element
    }

    createRegl({
      ...(opts.regl),
      attributes: {
        ...(opts.regl.attributes || {}),
      },
      extensions: [
        ...(opts.regl.extensions || []),
        'OES_texture_float',
      ],

      optionalExtensions: [
        ...(opts.regl.optionalExtensions || []),
      ],

      onDone: (err, regl) => {
        if (err) {
          return this.emit('error', err)
        }

        this._regl = regl
        this._domElement = this._regl._gl.canvas
        this._isDestroyed = false
      }
    })

    // DOM events
    events.on(this._domElement, 'focus', () => this.focus())
    events.on(this._domElement, 'blur', () => this.blur())
    events.on(window, 'blur', () => this.blur())
  }

  get reglContext() { return this._reglContext }
  get domElement() { return this._domElement }
  get hasFocus() { return this._hasFocus }
  get caller() { return this._caller }
  get scope() { return this._scope }
  get depth() { return this._stack.length }
  get state() { return this._stack }
  get regl() { return this._regl }

  /**
   * Focuses context.
   *
   * @return {Context}
   */

  focus() {
    this._hasFocus = true
    this.emit('focus')
    return this
  }

  /**
   * Blurs context.
   *
   * @return {Context}
   */

  blur() {
    this._hasFocus = false
    this.emit('blur')
    return this
  }

  /**
   * Pushes command to context stack.
   *
   * @param {Command} command
   * @return {Context}
   */

  push(command) {
    if ('function' == typeof command) {
      this._scope = this._stack[this._stack.length - 1]
      this._stack.push(command)
      this._caller = command
    }
    return this
  }

  /**
   * Pops tail of context command stack.
   *
   * @return {Context}
   */

  pop() {
    let command = this._stack.pop()
    this._caller = this._stack[this._stack.length - 1]
    this._scope = command
    return command
  }

  /**
   * Updates command context state.
   *
   * @param {Function|Object} block
   * @return {Context}
   */

  update(block) {
    if (block && 'object' == typeof block) {
      Object.assign(this._state, block)
    }
    return this
  }

  /**
   * Resets context state.
   *
   * @return {Context}
   */

  reset() {
    this._caller = null
    this._scope = null
    this._stack.splice(0, this._stack.length)
  }

  /**
   * @TODO(werle) - move this Frame as a context function
   * Clears the clear buffers in regl.
   *
   * @return {Context}
   */

  clear() {
    if (this._regl && this._state) {
      this._regl.clear(this._state.clear)
    }
    return this
  }

  /**
   * Destroys the context and the
   * regl context associated with it.
   *
   * @return {Context}
   */

  destroy() {
    this.clear()

    if (this._regl && 'function' == typeof this._regl.destroy) {
      this._regl.destroy()
    }

    this._state = {}
    this._stack = []
    this._hasFocus = false

    delete this._regl
    delete this._scope
    delete this._caller
    delete this._domElement
    delete this._reglContext
    return this
  }
}
