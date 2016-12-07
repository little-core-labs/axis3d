'use strict'

/**
 * Module dependencies.
 */

import { MediaCommand } from './media'
import isPowerOfTwo from 'is-power-of-two'
import getPixels from 'get-pixels'
import toCanvas from 'image-to-canvas'
import raf from 'raf'

import {
  clampToMaxSize,
  makePowerOfTwo,
  define,
  debug,
} from '../utils'

/**
 * ImageCommand constructor.
 * @see ImageCommand
 */

module.exports = exports = (...args) => new ImageCommand(...args)

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
   * @param {Object} [initialState]
   */

  constructor(ctx, src, initialState = {}) {
    let buffer = null
    let source = null
    let texture = null
    let isConvertingToBuffer = false

    const manifest = {
      image: {
        stream: true,
        type: 'image',
        src: 'string' == typeof src ? src : undefined
      },

      regl: {
        blend: {
          enable: true,
          func: {
            src: 'src alpha',
            dst: 'one minus src alpha'
          },
        },
      }
    }

    const textureState = Object.assign({
      alignment: 4,
      flipY: true,
      wrap: ['clamp', 'clamp'],
      min: 'linear',
      mag: 'linear',

      get data() {
        if (buffer) {
          return buffer
        } else if (source) {
          return source
        }
      },
    }, initialState.texture)


    // sanitize initialState object
    for (let key in initialState) {
      if (undefined === initialState[key]) {
        delete initialState[key]
      }
    }

    super(ctx, manifest, initialState)

    this.once('load', () => {
      if (source instanceof Image) {
        // set initial set on source
        Object.assign(source, initialState)
      }
    })

    // dimensions
    define(this, 'width', { get: () => source ? source.width || source.shape[0] || 0 : 0})
    define(this, 'height', { get: () => source ? source.height || source.shape[1] || 0 : 0})
    define(this, 'aspectRatio', { get: () => this.width/this.height || 1 })

    // expose DOM element when available
    define(this, 'domElement', {
      get: () => source instanceof Node ? source : null
    })

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

    define(this, 'texture', {
      get: () => texture,
      set: (value) => {
        if (texture && null === value) {
          texture.destroy()
          texture = ctx.regl.texture({ ...textureState })
        } if (value) {
          if (texture) {
            texture.destroy()
          }
          texture = value
        }
      }
    })

    if (initialState && initialState.texture) {
      texture = initialState.texture
    }

    if ('object' == typeof src) {
      if (src.source) {
        source = src.source
      } else if (src.buffer) {
        buffer = src.buffer
      }
      delete src.buffer
      delete src.source
      Object.assign(textureState, src)
      raf(() => this.refresh())
      raf(() => this.emit('load'))
    }

    /**
     * Refreshes image texture with current
     * texture state.
     */

    this.refresh = () => {
      if (textureState.data) {
        texture({ ...textureState })
      }
    }

    /**
     * Callback when image has loaded.
     *
     * @type {Function}
     */

    this.onloaded = ({image}) => {
      source = clampToMaxSize(
        image,
        ctx.regl.limits.maxTextureSize,
        !(isPowerOfTwo(image.width) || isPowerOfTwo(image.height))
      )

      const needsMipmaps = Boolean(image && (
        !isPowerOfTwo(image.height) ||
        !isPowerOfTwo(image.width)
      ))

      if (needsMipmaps) {
        textureState.mipmap = needsMipmaps
        textureState.min = 'linear mipmap nearest'
      }

      if (texture) { texture.destroy() }
      texture = ctx.regl.texture({ ...textureState })

      this.emit('load')
      raf(() => this.refresh())
    }
  }
}
