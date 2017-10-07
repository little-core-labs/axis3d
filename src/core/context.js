import { EventEmitter } from 'events'
import coalesce from 'defined'
import document from 'global/document'
import combine from 'regl-combine'
import window from 'global/window'
import events from 'dom-events'
import regl from '@littlstar/regl'

/**
 * The Context class wraps gl (regl) state and is required for most
 * components to be created.
 * @public
 * @class Context
 * @extends EventEmitter
 */
export class Context extends EventEmitter {

  /**
   * Default optional WebGL extensions to be loaded
   * during the creation of a WebGL context.
   * @accessor
   * @type {Array<String>}
   */
  static get kDefaulOptionaltExtensions() {
    return [ 'OES_vertex_array_object', 'OES_texture_float' ]
  }

  /**
   * Context class constructor.
   * @param {?(Object)} [opts = {}] Context configuration
   * @param {?(Function)} [createRegl = regl] Regl context constructor
   */
  constructor(opts = {}, createRegl = regl) {
    if (null != opts && 'object' != typeof opts || Array.isArray(opts)) {
      throw new TypeError("Context(): expecting object as first argument.")
    } else if (null != createRegl && 'function' != typeof createRegl) {
      throw new TypeError("Context(): expecting function as second argument.")
    }

    if (null == opts) { opts = {} }
    if ('function' != typeof createRegl) { createRegl = regl }

    super()

    this.setMaxListeners(Infinity)
    this._isDestroyed = false
    this._hasFocus = false

    // coalesce regl options if given as `.gl`
    opts.regl = coalesce(opts.regl, opts.gl || {})
    if (opts.gl && opts.gl.context) {
      opts.regl.gl = opts.gl.context
      delete opts.gl.context
    }

    // derive container element
    if (opts.canvas && 'object' == typeof opts.canvas) {
      opts.regl.canvas = opts.canvas
    } else if (opts.element && 'CANVAS' == opts.element.nodeName) {
      opts.regl.canvas = opts.element
    } else if (opts.element && opts.element.nodeName) {
      opts.regl.container = opts.element
    } else if ('string' == typeof opts.element) {
      opts.regl.container = opts.element
    }

    // call regl initializer
    void createRegl({
      pixelRatio: opts.pixelRatio || window.devicePixelRatio || 1,
      profile: Boolean(opts.profile),
      ...opts.regl,
      attributes: { ...(opts.regl.attributes || {}) },
      extensions: [ ...(opts.regl.extensions || []) ],
      optionalExtensions: [
        ...Context.kDefaulOptionaltExtensions,
        ...(opts.regl.optionalExtensions || [])
      ],

      onDone: (err, regl) => {
        if (err) { return this.emit('error', err) }
        this._regl = combine.wrap(regl)
        this._isDestroyed = false
        if (regl._gl && regl._gl.canvas) {
          this._domElement = this._regl._gl.canvas
        } else {
          this._domElement = null
        }
      }
    })

    if (
      null != this._domElement &&
      'undefind' != typeof window &&
      'undefind' != typeof document
    ) {
      const bind = (t, e, f) => {
        events.on(t, e, f)
        this.once('beforedestroy', () => events.off(t, e, f))
      }
      // context focus event handlers
      const onblur = () => { this.blur() }
      const onfocus = () => { this.focus() }
      const onwindowblur = () => { this.blur() }
      const onmousedown = (e) => {
        if (e.target == this._domElement) { this.focus() }
        else { this.blur() }
      }
      bind(this._domElement, 'blur', onblur)
      bind(this._domElement, 'focus', onfocus)
      bind(window, 'blur', onwindowblur)
      bind(document, 'mousedown', onmousedown)
      bind(document, 'touchstart', onmousedown)
    }
  }

  /**
   * Boolean value to indicate if context instance is destroyed.
   * @accessor
   * @type {Boolean}
   */
  get isDestroyed() { return Boolean(this._isDestroyed) }

  /**
   * Boolean value to indicate if context instance has focus.
   * @accessor
   * @type {Boolean}
   */
  get hasFocus() { return Boolean(this._hasFocus) }

  /**
   * Underlying canvas DOM element that owns the WebGL context.
   * @accessor
   * @type {HTMLCanvasElement|null}
   */
  get domElement() { return this._domElement || null }

  /**
   * Underlying regl instance.
   * @accessor
   * @type {Function|null}
   */
  get regl() { return this._regl || null }

  /**
   * Underlying WebGLRenderingContext instance.
   * @accessor
   * @type {WebGLRenderingContext|null}
   */
  get gl() { return this._regl && this._regl._gl || null }

  /**
   * Wrapper around EventEmitter#removeListener
   * and EventEmitter#removeAllListeners class methods.
   * @method
   * @see {@link https://nodejs.org/api/events.html#events_emitter_removealllisteners_eventname}
   * @see {@link https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener}
   * @return {Context}
   */
  off(...args) {
    if (2 == args.length) {
      return this.removeListener(...args)
    } else {
      return this.removeAllListeners(...args)
    }
  }

  /**
   * Focuses context and underlying DOM element.
   * @method
   * @emits focus
   * @return {Context}
   */
  focus() {
    this._hasFocus = true
    if (this.domElement) { this.domElement.focus() }
    this.emit('focus')
    return this
  }

  /**
   * Blurs context and underlying DOM element.
   * @method
   * @emits blur
   * @return {Context}
   */
  blur() {
    this._hasFocus = false
    if (this.domElement) { this.domElement.blur() }
    this.emit('blur')
    return this
  }

  /**
   * Destroys underling regl and gl context instances and removes
   * underling DOM element from its parent element if it exists.
   * @method
   * @emits beforedestroy
   * @emits destroy
   * @return {Context}
   */
  destroy() {
    this.emit('beforedestroy')
    if (this._regl && 'function' == typeof this._regl.destroy) {
      this._regl.destroy()
      delete this._regl
    }

    if (this._domElement) {
      if (this._domElement.parentElement) {
        this._domElement.parentElement.removeChild(this._domElement)
      }
      delete this._domElement
    }

    this._hasFocus = false
    this._isDestroyed = true
    this.emit('destroy')
    return this
  }

  /**
   * Refreshes regl state. This method shouldn't be called unless
   * there has been direct manipulation of the underlying WebGLRenderingContext
   * instance outside of this context instance.
   * @method
   * @return {Context}
   */
  refresh() {
    if (this.regl && 'function' == typeof this.regl._refresh) {
      this.regl._refresh()
    }
    return this
  }

  /**
   * Flushes the underlying WebGLRenderingContext instance.
   * @method
   * @return {Context}
   */
  flush() {
    if (this.gl) { this.gl.flush() }
    return this
  }

  /**
   * Polls the underlying regl state. This method shouldn't be callled unless
   * components are used outside of the {@link Frame} component.
   * @method
   * @return {Context}
   */
  poll() {
    if (this.regl) {
      if (this.regl && 'function' == typeof this.regl.poll) {
        this.regl.poll()
      }
    }
    return this
  }
}
