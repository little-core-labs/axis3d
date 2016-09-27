'use strict'

/**
 * Module dependencies.
 */

import { debug, define } from '../utils'
import { MediaCommand } from '../media'

/**
 * ImageCommand constructor.
 * @see ImageCommand
 */

export default (...args) => new ImageCommand(...args)

/**
 * ImageCommand class.
 *
 * @public
 * @class ImageCommand
 * @extends MediaCommand
 */

export class ImageCommand extends MediaCommand {

  /**
   * ImageCommand class constructor.
   *
   * @constructor
   * @param {Context} ctx
   * @param {String} src
   * @param {(Object)?} initialState
   */

  constructor(ctx, src, initialState = {}) {
    let source = null

    const manifest = {
      image: {
        stream: true,
        type: 'image',
        src: src
      }
    }

    // sanitize initialState object
    for (let key in initialState) {
      if (undefined === initialState[key]) {
        delete initialState[key]
      }
    }

    super(ctx, manifest, initialState)

    this.once('load', () => {
      // set initial set on source
      Object.assign(source, initialState)
    })

    // proxy dimensions
    define(this, 'width', { get: () => source.width })
    define(this, 'height', { get: () => source.height })
    define(this, 'aspectRatio', {
      get: () => source ? source.width / source.height : 1
    })

    // expose DOM element
    define(this, 'domElement', { get: () => source })

    this.type = 'image'

    /**
     * Sets an internal image source property
     * value. This function is used
     * to proxy a class method to a image
     * element property
     *
     * @private
     * @param {String} method
     * @param {...Mixed} args
     * @return {ImageCommand|Mixed}
     */

    const set = (property, value) => {
      if (source) {
        if (undefined === value) {
          return source[property]
        } else {
          debug('ImageCommand: set %s=%s', property, value)
          source[property] = value
        }
      } else {
        this.once('load', () => { this[property] = value })
      }
      return this
    }

    /**
     * Source attribute accessor.
     *
     * @type {String}
     */

    define(this, 'src', {
      get: () => {
        return (source && source.src) ?
          source.src :
          (this.manifest && this.manifest.image) ?
            this.manifest.image.src :
            null
      },

      set: (value) => {
        if (source && 'string' == typeof value) {
          source.src = value
          if (this.manifest && this.manifest.image) {
            this.manifest.image.src = value
            this.reset()
            this.load()
          }
        }
      }
    })

    /**
     * Image texture target.
     *
     * @type {REGLTexture}
     */

    this.texture = initialState && initialState.texture ?
      initialState.texture :
        ctx.regl.texture({
          wrap: ['clamp', 'clamp'],
          mag: 'linear',
          min: 'linear',
        })

    /**
     * Callback when image has loaded.
     *
     * @type {Function}
     */

    this.onloaded = ({image}) => {
      source = image
      this.texture(image)
      this.emit('load')
    }
  }
}
