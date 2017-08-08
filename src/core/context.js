import { EventEmitter } from 'events'
import coalesce from 'defined'
import document from 'global/document'
import window from 'global/window'
import events from 'dom-events'
import regl from 'regl'

export class Context extends EventEmitter {
  constructor(opts = {}, createRegl = regl) {
    super()
    this.setMaxListeners(Infinity)

    this._store = new Map()
    this._hasFocus = false
    this._reglContext = null

    // coalesce regl options if given as `.gl`
    opts.regl = coalesce(opts.regl, opts.gl || {})

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
      ...opts.regl,
      attributes: {...(opts.regl.attributes || {})},
      extensions: [
        'OES_texture_float',
        ...(opts.regl.extensions || [])
      ],

      optionalExtensions: [
        'ANGLE_instanced_arrays',
        ...(opts.regl.optionalExtensions || [])
      ],

      onDone: (err, regl) => {
        if (err) { return this.emit('error', err) }
        this._regl = regl
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

  get reglContext() { return this._reglContext || null }
  get domElement() { return this._domElement || null }
  get hasFocus() { return Boolean(this._hasFocus) }
  get regl() { return this._regl || null }
  get gl() { return this._regl._gl || null  }

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
    delete this._store
    delete this._domElement
    delete this._reglContext
    this._hasFocus = false
    this.emit('destroy')
    return this
  }

  refresh() {
    if (this._regl) {
      if ('function' == typeof this._regl._refresh)
      this._regl.refresh()
    }
    return this
  }

  get(key) {
    if (this._store) {
      return this._store.get(key)
    }
    return null
  }

  set(key, value) {
    if (this._store) {
      this._store.set(key, value)
      return value
    }
    return null
  }
}
