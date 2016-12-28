'use strict'

/**
 * Module dependencies.
 */

import makeVideoPlayableInline from 'iphone-inline-video'
import { debug, define } from '../utils'
import { MediaCommand } from './media'
import { ImageCommand } from './image'
import isPowerOfTwo from 'is-power-of-two'
import events from 'dom-events'
import clamp from 'clamp'
import raf from 'raf'

/**
 * VideoCommand constructor.
 */

module.exports = exports = (...args) => new VideoCommand(...args)

export class VideoCommand extends MediaCommand {
  constructor(ctx, src, initialState = {}) {
    let source = null
    let poster = null
    let volume = 0
    let texture = null

    let isMuted = false
    let isPaused = true
    let isPlaying = false

    let wantsMute = false
    let wantsPause = false
    let wantsPlay = false

    // Texture state used for regl texture updates.
    const textureState = Object.assign({
      format: 'rgba',
      flipY: true,
      wrap: ['clamp', 'clamp'],
      mag: 'linear',
      min: 'linear',
    }, initialState.texture)

    // Video manifest for resl.
    const manifest = {
      video: Object.assign({
        stream: true,
        type: 'video',
        src: src
      }, initialState.manifest)
    }

    // sanitize initialState object
    delete initialState.manifest
    delete initialState.texture
    for (let key in initialState) {
      if (undefined === initialState[key]) {
        delete initialState[key]
      }
    }

    //
    // Calls internal video source method
    // with arguments. This function is used
    // to proxy a class method to a video
    // element method.
    //
    const call = (method, ...args) => {
      if (source) {
        debug('VideoCommand: call %s(%j)', method, args)
        const ret = source[method](...args)
        if (ret && 'function' == typeof ret.catch) {
          ret.catch((err) => this.emit('error', err))
        }
        window.source = source
      } else {
        this.once('load', () => this[method](...args))
      }
      return this
    }

    //
    // Sets an internal video source property
    // value. This function is used
    // to proxy a class method to a video
    // element property
    //
    const set = (property, value) => {
      if (source) {
        if (undefined === value) {
          return source[property]
        } else {
          debug('VideoCommand: set %s=%s', property, value)
          source[property] = value
        }
      } else {
        this.once('load', () => { this[property] = value })
      }
      return this
    }

    //
    // Emits an event on the instance.
    //
    const emit = (event, ...args) => {
      this.emit(event, ...args)
      return this
    }

    //
    // Sets video texture
    //
    const setTexture = (value) => {
      if (texture && null === value) {
        texture.destroy()
        texture = ctx.regl.texture({ ...textureState })
      } else {
        texture = ctx.regl.texture({ ...textureState })
      }

      if (value && texture) {
        texture.destroy()
        texture = value
      }
    }

    super(ctx, manifest, initialState)

    setTexture(
      initialState && initialState.texture ?
        initialState.texture :
        ctx.regl.texture({ ...textureState })
    )

    this.on('load', () => {
      const needsMipmaps = (
        isPowerOfTwo(source.videoHeight) &&
        isPowerOfTwo(source.videoWidth)
      )

      if (needsMipmaps) {
        textureState.mipmap = needsMipmaps
        textureState.min = 'linear mipmap nearest'
      }
    })

    this.once('load', () => {
      // set initial set on source
      Object.assign(source, initialState)
      const proxy = (event, override) => {
        events.on(source, event, (...args) => {
          debug("VideoCommand: event: %s", event)
          emit(override || event, ...args)
        })
      }

      // proxy source events
      for (let key in HTMLVideoElement.prototype) {
        if (key.match(/^on[a-z]/)) {
          proxy(key.replace(/^on/, ''))
          define(this, key, {
            get: () => source[key],
            set: (value) => source[key] = value
          })
        }
      }

      volume = source.volume
      isMuted = source.muted
      isPaused = source.paused
      isPlaying = !isPaused
    })

    // set to playing state
    this.on('play', () => {
      isPlaying = true
      isPaused = false
    })
    this.on('playing', () => {
      isPlaying = true
      isPaused = false
    })

    // set to paused state
    this.on('pause', () => {
      isPlaying = false
      isPaused = true
    })

    // set volume mute state
    this.on('mute', () => { isMuted = true })
    this.on('unmute', () => { isMuted = false })

    //
    // Source attribute accessor.
    //

    // proxy all configurable video properties that serve
    // some kind of real purpose
    // @TODO(werle) - support text tracks
    ;[
      'playbackRate',
      'currentTime',
      'crossOrigin',
      'currentSrc',
      'duration',
      'seekable',
      'volume',
      'paused',
      'played',
      'prefix',
      'title',
      'muted',
      'loop',
    ].map((property) => define(this, property, {
      get: () => source ? source[property] : null,
      set: (value) => {
        if (source) {
          source[property] = value
        } else {
          this.once('load', () => { source[property] = value })
        }
      }
    }))

    // set poster if applicable
    if (initialState && initialState.poster) {
      this.poster = initialState.poster
    }

    // expose DOM element
    define(this, 'domElement', { get: () => source })

    // overload
    const reload = this.reload
    this.reload = () => {
      if (source) {
        source.pause()
        source.currentTime = 0
        source.load()

        if (wantsPlay) {
          source.play()
        }

        if (wantsMute) {
          source.muted = true
        }
      }

      reload()
      return this
    }

    // Callback when video  has loaded.
    this.onloaded = ({video}) => {
      video.setAttribute('playsinline', true)
      makeVideoPlayableInline(video)

      source = video

      if (null == poster) {
        textureState.data = source
        texture({ ...textureState })
      }

      if ('function' == typeof source.load) {
        source.load()
      }

      let lastRead = 0
      this._read = (done) => {
        const now = Date.now()
        if (true && (now - lastRead >= 64) && source.readyState >= source.HAVE_ENOUGH_DATA) {
          lastRead = now
          debug('VideoCommand: read')
          textureState.data = source
          texture({ ...textureState })
        }
      }
    }

    //
    // Public methods
    //
    this.play = () => (wantsPlay = true) && call('play')
    this.pause = () => (wantsPause = true) && call('pause')
    this.mute = () => (wantsMute = true) && set('muted', true) && emit('mute')
    this.unmute = () => !(wantsMute = false) && set('muted', false) && emit('unmute')

    //
    // Public properties
    //
    define(this, 'width', { get: () => source ? source.videoWidth : 0})
    define(this, 'height', { get: () => source ? source.videoHeight : 0})
    define(this, 'aspectRatio', { get: () => {
      if (source) {
        return source.videoWidth/source.videoHeight
      } else if (poster) {
        return poster.aspectRatio
        } else {
          return 1
        }
      }
    })

    define(this, 'texture', {
      get: () => texture,
      set: (value) => {
        setTexture(value)
      }
    })

    define(this, 'poster', {
      get: () => source ? source.poster : null,
      set: (value) => {
        if (value) {
          if (source) {
            source.poster = value.src || value
          } else {
            this.once('load', () => { source.poster = value.src || value })
          }

          if (null == poster) {
            if (value) {
              poster = new ImageCommand(ctx, value.src || value, {texture})
            }
          }
        }
      },
    })

    define(this, 'src', {
      get: () => {
        if (source && source.src) {
          return source.src
        } else if (this.manifest && this.manifest.video) {
          return this.manifest.video.src
        } else {
          return null
        }
      },

      set: (value) => {
        if (source && 'string' == typeof value) {
          source.src = value
          if (this.manifest && this.manifest.video) {
            this.manifest.video.src = value
            this.reset()
            this.load()
          }
        }
      }
    })
  }
}
