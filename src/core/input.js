'use strict'

/**
 * Module dependencies.
 */

import { StreamContext, Stream } from './stream'
import coalesce from 'defined'

/**
 * The Input class represents an interface to inquiring input information
 * as it is emitted from a stream. This class serves as the base class for
 * various inputs such as keyboard and mouse.
 *
 * @public
 * @class Input
 * @extends Stream
 */

export class Input extends Stream {

  /**
   * Input class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Injected regl context
     */

    const {context = new InputContext(ctx, initialState)} = initialState

    /**
     * Input initialization function.
     */

    const {init} = initialState

    super(ctx, {context, ...initialState})

    if ('function' == typeof init) {
      init(ctx, {
        ...initialState,
        context,
        stream: context.stream,
      })
    }
  }
}

/**
 * InputContext class.
 *
 * @public
 * @class InputContext
 * @extends StreamContext
 */

export class InputContext extends StreamContext {

  /**
   * InputContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(ctx, {transform, ...initialState})

    /**
     * Input properties to pluck from the update function
     * returned by the init function.
     */

    const {props = []} = initialState

    /**
     * Reference to last transformed input data.
     */

    let data = null

    /**
     * Input stream transform function.
     */

    function transform(chunk) {
      data = null == chunk ? null : props.reduce((d, prop) => {
        return {...d, [prop]: chunk[prop]}
      }, {})
      return data
    }

    // dynamically set input context properties
    for (const prop of props) {
      this[prop] = () => {
        return data ? coalesce(data[prop], undefined) : undefined
      }
    }
  }
}
