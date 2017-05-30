'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'

import { EventEmitter } from 'events'
import coalesce from 'defined'
import window from 'global/window'
import events from 'dom-events'
import glsl from 'glslify'
import regl from 'regl'

/** @virtual {WebGLRenderingContext} https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext */
/** @virtual {HTMLCanvasElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement */
/** @virtual {ReglInitializer} https://github.com/regl-project/regl/blob/gh-pages/API.md#all-initialization-options */
/** @virtual {regl} https://github.com/regl-project/regl/blob/gh-pages/API.md */

/**
 * The Context class represents an object that wraps
 * a WebGL context created by regl.
 *
 * @public
 * @class Context
 * @extends EventEmitter
 * @see {@link https://github.com/regl-project/regl}
 */

export class Context extends EventEmitter {

  /**
   * Context class constructor.
   *
   * @public
   * @constructor
   * @param {?Object} opts
   * @param {?ReglInitializer} createRegl
   */

  constructor(opts = {}, createRegl = regl) {
    super() // EventEmitter()
    registerStat('Context')
    // shut up EventEmitter
    this.setMaxListeners(Infinity)

    /**
     * Internal predicate to indicate that the context
     * has focus. IE, the HTMLCanvasElement has focus.
     * @private
     */

    this._hasFocus = false

    /**
     * The regl context wrapped by this context object.
     * @private
     */

    this._reglContext = null

    // coalesce regl options if given as `.gl`
    opts.regl = coalesce(opts.regl, opts.gl || {})

    // derive container element
    if (opts.element && 'CANVAS' == opts.element.nodeName) {
      opts.regl.canvas = opts.element
    } else if (opts.element && opts.element.nodeName) {
      opts.regl.container = opts.element
    } else if ('string' == typeof opts.element) {
      opts.regl.container = opts.element
    }

    // call regl initializer
    createRegl({
      ...opts.regl,

      attributes: {
        ...(opts.regl.attributes || {}),
      },

      extensions: [
        ...(opts.regl.extensions || []),
        'OES_texture_float',
        'WEBGL_draw_buffers'
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

    // context focus event handlers
    const onblur = () => { this.blur() }
    const onfocus = () => { this.focus() }
    const onwindowblur = () => { this.blur() }
    const onmousedown = (e) => {
      if (e.target == this._domElement) {
        this.focus()
      } else {
        this.blur()
      }
    }

    // DOM events
    events.on(this._domElement, 'focus', onfocus)
    events.on(this._domElement, 'blur', onblur)
    events.on(window, 'blur', () => onwindowblur)

    // focus/blur context on mouse down
    events.on(document, 'mousedown', onmousedown)
    events.on(document, 'touchstart', onmousedown)

    this.once('beforedestroy', () => {
      events.off(this._domElement, 'focus', onfocus)
      events.off(this._domElement, 'blur', onblur)
      events.off(window, 'blur', onwindowblur)
      events.off(document, 'mousedown', onmousedown)
      events.off(document, 'touchstart', onmousedown)
    })
  }

  /**
   * The regl context wrapped by this context object.
   *
   * @public
   * @accessor
   * @type {Object|null}
   * @name reglContext
   * @TODO(werle) - Remove this?
   */

  get reglContext() { return this._reglContext || null }

  /**
   * The Canvas DOM element wrapped by this context object.
   *
   * @public
   * @accessor
   * @type {HTMLCanvasElement|null}
   * @name domElement
   */

  get domElement() { return this._domElement || null }

  /**
   * Predicate to indicate that the context
   * has focus. This is true if the HTMLCanvasElement has focus,
   * or explicit focus has been given.
   *
   * @public
   * @accessor
   * @type {Boolean}
   * @name hasFocus
   * @see {@link Context#focus}
   * @see {@link Context#blur}
   */

  get hasFocus() { return Boolean(this._hasFocus) }

  /**
   * An instance of the wrapped regl context
   * command initializer.
   *
   * @public
   * @accessor
   * @type {regl|Function}
   */

  get regl() { return this._regl || null }

  /**
   * An instance of the wrapped WebGL context exposed
   * by regl.
   *
   * @public
   * @accessor
   * @type {WebGLRenderingContext}
   */

  get gl() { return this._regl._gl || null  }

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
   * Destroys the context and the
   * regl context associated with it.
   *
   * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#clean-up}
   * @return {Context}
   */

  destroy() {
    this.emit('beforedestroy')

    if (this._regl && 'function' == typeof this._regl.destroy) {
      this._regl.destroy()
    }

    this._hasFocus = false

    // remove canvas from DOM tree
    if (this._domElement && this._domElement.parentElement) {
      this._domElement.parentElement.removeChild(this._domElement)
    }

    delete this._regl
    delete this._domElement
    delete this._reglContext
    this.emit('destroy')
    return this
  }

  /**
   * Refreshes context. This is useful if you access the
   * .gl property outside of this library.
   *
   * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#unsafe-escape-hatch}
   * @return {Context}
   */

  refresh() {
    if (this._regl) {
      if ('function' == typeof this._regl._refresh)
      this._regl.refresh()
    }
    return this
  }
}
