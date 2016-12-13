'use strict'

/**
 * Module dependencies.
 */

import { debug, define } from '../utils'
import { EventEmitter } from 'events'
import { Object3DCommand } from '../object'
import resl from 'resl'
import raf from 'raf'

/**
 * reload timeout in milliseconds.
 *
 * @private
 * @type {Number}
 */

const DEFAULT_RELOAD_TIMEOUT = 30000

/**
 * No-op to return undefined
 *
 * @private
 * @type {Function}
 */

const noop = () => void 0

/**
 * MediaCommand constructor.
 * @see MediaCommand
 */

module.exports = exports = (...args) => new MediaCommand(...args)

/**
 * MediaCommand class.
 *
 * @public
 * @class MediaCommand
 * @extends Object3DCommand
 */

export class MediaCommand extends Object3DCommand {

  /**
   * MediaCommand class constructor that loads
   * resources from a given manifest using resl
   *
   * @constructor
   * @param {Object} ctx
   * @param {Object} manifest
   * @param {Object} [initialState]
   */

  constructor(ctx, manifest, initialState = {}) {
    let isDoneLoading = false
    let retryTimeout = null
    let isCancelled = false
    let hasProgress = false
    let isLoading = false
    let hasError = false
    let timeout = DEFAULT_RELOAD_TIMEOUT

    // load when called as a function
    super(ctx, {
      type: 'media',
      draw: (_, state, block) => this.read(block)
    })

    // mixin and initialize EventEmitter
    EventEmitter.call(this)
    Object.assign(this, EventEmitter.prototype)
    this.setMaxListeners(Infinity)
    this.on('error', (err) => ctx.emit('error', err))

    // preload unless otherwise specified
    if (initialState && false !== initialState.preload) {
      raf(() => this.load())
    }

    define(this, 'manifest', { get: () => manifest })
    define(this, 'isDoneLoading', { get: () => isDoneLoading })
    define(this, 'isCancelled', { get: () => isCancelled })
    define(this, 'hasProgress', { get: () => hasProgress })
    define(this, 'isLoading', { get: () => isLoading })
    define(this, 'hasError', { get: () => hasError })
    define(this, 'hasData', {
      get: () => !hasError && (isDoneLoading || hasProgress)
    })

    this.update = (newManifest) => {
      Object.assign(manifest, newManifest)
      return this
    }


    this.read = (done = () => void 0) => {
      this._read(done)
      return this
    }

    this._read = (done = () => void 0) => {
      done()
      return this
    }

    this.reload = () => {
      this.reset()
      this.load()
      return this
    }

    this.reset = () => {
      isDoneLoading = false
      isCancelled = false
      hasProgress = false
      isLoading = false
      hasError = false
      return this
    }

    this.cancel = () => {
      this.reset()
      isCancelled = true
      return this
    }

    this.setTimeout = (value) => {
      timeout = value
      return this
    }

    this.load = () => {
      const requested = {}

      if (isCancelled || isLoading || hasProgress || hasError || isDoneLoading) {
        return false
      }

      for (let key in manifest) {
        if ('object' == typeof manifest[key]) {
          if ('string' == typeof manifest[key].src) {
            requested[key] = manifest[key]
          }
        }
      }

      if (0 == Object.keys(requested).length) {
        return false
      }

      const retry = () => {
        clearTimeout(retryTimeout)
        retryTimeout = setTimeout(() => {
          clearTimeout(retryTimeout)
          if (hasError || ((hasProgress || isLoading) && !isDoneLoading)) {
            debug('retrying....')
            this.reload()
          }
        }, timeout)
      }

      retry()

      isLoading = true
      raf(() => resl({
        manifest: requested,

        onDone: (...args) => {
          isDoneLoading = true
          void (this.onloaded || noop)(...args)
          this.emit('load', ...args)
        },

        onError: (...args) => {
          hasError = true
          isDoneLoading = true
          void (this.onerror || noop)(...args)
          this.emit('error', ...args)
          retry()
        },

        onProgress: (...args) => {
          hasProgress = true
          void (this.onprogress || noop)(...args)
          this.emit('progress', ...args)
        },
      }))

      return true
    }
  }
}
