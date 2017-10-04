import { EventEmitter } from 'events'
import coalesce from 'defined'
import document from 'global/document'
import combine from 'regl-combine'
import window from 'global/window'
import events from 'dom-events'
import regl from '@littlstar/regl'

export class Context extends EventEmitter {
  constructor(opts = {}, createRegl = regl) {
    super()
    this.setMaxListeners(Infinity)
    this._hasFocus = false
    this._isDestroyed = false

    this._state = []

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
    createRegl({
      pixelRatio: opts.pixelRatio || window.devicePixelRatio || 1,
      profile: Boolean(opts.profile),
      ...opts.regl,
      attributes: { ...(opts.regl.attributes || {}) },
      extensions: [ ...(opts.regl.extensions || []) ],
      optionalExtensions: [
        'ANGLE_instanced_arrays',
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

  get isDestroyed() { return Boolean(this._isDestroyed) }
  get hasFocus() { return Boolean(this._hasFocus) }

  get domElement() { return this._domElement || null }
  get state() { return this._state || null }
  get regl() { return this._regl || null }
  get gl() { return this._regl && this._regl._gl || null }

  focus() {
    this._hasFocus = true
    this.emit('focus')
    return this
  }

  blur() {
    this._hasFocus = false
    this.emit('blur')
    return this
  }

  destroy() {
    this.emit('beforedestroy')
    if (this._regl && 'function' == typeof this._regl.destroy) {
      this._regl.destroy()
    }

    if (this._domElement && this._domElement.parentElement) {
      this._domElement.parentElement.removeChild(this._domElement)
    }

    delete this._regl
    delete this._domElement
    this._hasFocus = false
    this.emit('destroy')
    return this
  }

  refresh() {
    if (this.regl && 'function' == typeof this.regl._refresh) {
      this.regl._refresh()
    }
    return this
  }

  flush() {
    if (this.gl) {
      this.gl.flush()
    }
    return this
  }

  poll() {
    if (this.regl) {
      if (this.regl && 'function' == typeof this.regl.poll) {
        this.regl.poll()
      }
    }
  }
}
