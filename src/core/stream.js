'use strict'

/**
 * Module dependencies.
 */

import { Command } from './command'

import { obj as through } from 'through2'
import coalesce from 'defined'

/**
 * The Stream class represents a stateless transform stream.
 *
 * @public
 * @class Stream
 * @extends Command
 * @see {@link https://github.com/rvagg/through2}
 */

export class Stream extends Command {

  /**
   * Stream class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Stream regl context.
     */

    const {context = new StreamContext(ctx, initialState)} = initialState

    /**
     * Injects a stream regl context.
     */

    const injectContext = ctx.regl({context})

    /**
     * Streams update function.
     */

    const {update = defaultUpdate} = initialState

    /**
     * Command update function.
     */

    function defaultUpdate(state = {}, block) {
      if (null != state.data && context && context.stream) {
        context.stream.write(state.data, () => {
          injectContext(state, block)
        })
      } else {
        injectContext(state, block)
      }

      return this
    }

    super(update)
  }
}

/**
 * StreamContext class.
 *
 * @public
 * @class StreamContext
 */

export class StreamContext {

  /**
   * StreamContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Internal transform through stream.
     */

    const {stream = through(transform)} = initialState

    /**
     * Optional transform function.
     */

    const {transform: transformData} = initialState

    /**
     * Reference to last emitted data.
     */

    let data = null

    stream.on('error', (err) => { ctx.emit('error', err) })

    /**
     * Internal stream context reference.
     *
     * @public
     * @type {TransformStream}
     */

    this.stream = stream

    /**
     * Reference to the latest data emitted.
     *
     * @public
     * @type {Mixed}
     */

    this.data = () => {
      return {...data}
    }

    /**
     * Transform stream callback
     */

    function transform(chunk, {}, done) {
      if ('function' == typeof transformData) {
        chunk = coalesce(transformData(chunk), chunk)
      }

      if (null != chunk) {
        data = chunk
        this.push(data)
      }
      done()
    }
  }
}
