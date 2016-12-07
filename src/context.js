'use strict'

/**
 * Module dependencies.
 */

import { EventEmitter } from 'events'
import events from 'dom-events'
import glsl from 'glslify'
import regl from 'regl'

import {
  $isDestroyed,
  $reglContext,
  $domElement,
  $hasFocus,
  $scope,
  $caller,
  $stack,
  $state,
  $regl
} from './symbols'

export const defaults = {
  clear: {
    // @TODO(werle) - use a color module
    color: [17/255, 17/255, 17/255, 1],
    depth: 1,
  },
}

/**
 * Creates a new Context instance with
 * sane defaults.
 *
 * @param {Object} opts
 */

module.exports = exports = (state, opts) =>
  new Context({...defaults, ...state}, opts)

/**
 * Context class.
 *
 * @public
 * @class Context
 * @extends EventEmitter
 */

export class Context extends EventEmitter {

  /**
   * Context class constructor.
   *
   * @param {Objects} [initialState]
   * @param {Object} [opts]
   */

  constructor(initialState = {}, opts = {}, createRegl = regl) {
    super()
    const reglOptions = {
      ...(opts.regl || {}),
      extensions: [
        ...(opts.regl? opts.regl.extensions || [] : []),
        'OES_texture_float',
      ],

      optionalExtensions: [
        ...(opts.regl? opts.regl.optionalExtensions || [] : []),
        'webgl_draw_buffers',
      ],

      onDone: (err, regl) => {
        if (err) {
          console.error(err.stack || err)
        } else {
          this[$regl] = regl
        }
      }
    }

    if (opts.element && 'CANVAS' == opts.element.nodeName) {
      reglOptions.canvas = opts.element
    } else if (opts.element && opts.element.nodeName) {
      reglOptions.container = opts.element
    } else if ('string' == typeof opts.element) {
      reglOptions.container = opts.element
    }

    createRegl(reglOptions)
    this[$stack] = []
    this[$state] = initialState
    this[$caller] = null
    this[$scope] = null
    this[$hasFocus] = false
    this[$domElement] = this[$regl]._gl.canvas
    this[$reglContext] = null
    this[$isDestroyed] = false

    this.setMaxListeners(Infinity)

    events.on(this[$domElement], 'focus', () => this.focus())
    events.on(this[$domElement], 'blur', () => this.blur())
    events.on(window, 'blur', () => this.blur())
  }

  get caller() { return this[$caller] }
  get scope() { return this[$scope] }
  get depth() { return this[$stack].length }
  get domElement() { return this[$domElement] }
  get hasFocus() { return this[$hasFocus] }
  get reglContext() { return this[$reglContext] }
  get state() { return this[$stack] }
  get regl() { return this[$regl] }

  /**
   * Focuses context.
   *
   * @return {Context}
   */

  focus() {
    this[$hasFocus] = true
    this.emit('focus')
    return this
  }

  /**
   * Blurs context.
   *
   * @return {Context}
   */

  blur() {
    this[$hasFocus] = false
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
      this[$scope] = this[$stack][this[$stack].length - 1]
      this[$stack].push(command)
      this[$caller] = command
    }
    return this
  }

  /**
   * Pops tail of context command stack.
   *
   * @return {Context}
   */

  pop() {
    let command = this[$stack].pop()
    this[$caller] = this[$stack][this[$stack].length - 1]
    this[$scope] = command
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
      Object.assign(this[$state], block)
    }
    return this
  }

  /**
   * Resets context state.
   *
   * @return {Context}
   */

  reset() {
    this[$caller] = null
    this[$scope] = null
    this[$stack].splice(0, this[$stack].length)
  }

  /**
   * Clears the clear buffers in regl.
   *
   * @return {Context}
   */

  clear() {
    if (this[$regl] && this[$state]) {
      this[$regl].clear(this[$state].clear)
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

    if (this[$regl] && 'function' == typeof this[$regl].destroy) {
      this[$regl].destroy()
    }

    this[$state] = {}
    this[$stack] = []
    this[$hasFocus] = false

    delete this[$regl]
    delete this[$scope]
    delete this[$caller]
    delete this[$domElement]
    delete this[$reglContext]
    return this
  }
}
