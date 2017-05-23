'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'
import { Command } from '../core/command'
import keycode from 'keycode'
import events from 'dom-events'

/**
 * The KeyboardInput class represents a stateless interface for capturing
 * keyboard state for a given context.
 *
 * @public
 * @class KeyboardInput
 * @extends Command
 * @see Command
 */

export class KeyboardInput extends Command {

  /**
   * KeyboardInput class constructor.
   *
   * @public
   * @constructor
   * @param {Context} ctx Axis3D context object.
   * @param {?Object} opts Constructor options.
   */

  constructor(ctx, opts = {}) {
    registerStat('KeyboardInput')
    super(update)

    const keycodes = {}
    const keys = {}

    // update keydown states
    events.on(document, 'keydown', onkeydown, false)

    // update keyup states
    events.on(document, 'keyup', onkeyup, false)

    // reset keyboard state when context blurs
    ctx.on('blur', oncontextblur)
    events.on(window, 'blur', oncontextblur)

    // unbind event handlers when context is
    // destroyed
    ctx.once('destroy', () => {
      ctx.off('blur', oncontextblur)
      events.off(document, 'keydown', onkeydown)
      events.off(document, 'keyup', onkeyup)
    })

    /**
     * Handle contest blur
     *
     * @private
     * @function
     */

    function oncontextblur() {
      reset()
    }

    /**
     * Handles keydown events.
     *
     * @private
     * @function
     * @param {Event} e
     */

    function onkeydown(e) {
      if (ctx.hasFocus) {
        const code = e.which || e.keyCode || e.charCode
        if (null != code) {
          // set key code
          keycodes[code] = true
          // set key name
          keys[keycode(code)] = true
        }
      }
    }

    /**
     * Handles keyup events.
     *
     * @private
     * @function
     * @param {Event} e
     */

    function onkeyup(e) {
      const code = e.which || e.keyCode || e.charCode
      if (ctx.hasFocus) {
        if (null != code) {
          // set key code
          keycodes[code] = false
          // set key name
          keys[keycode(code)] = false
        }
      }
    }

    /**
     * Keyboard command update function.
     *
     * @private
     * @function
     * @name update
     * @implements Command
     * @param {?Object} state Input state
     * @param {?Function} block Block scope
     * @see Command
     */

    function update(state, block) {
      // ensure correct values
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      // ensure object
      state = 'object' == typeof state && state ? state : {}

      // ensure function
      block = 'function' == typeof block ? block : function() {}

      block({
        ...state,
        keycodes,
        keys
      })
    }

    /**
     * Resets keyboard state.
     *
     * @private
     * @function
     */

    function reset() {
      for (const code in keycodes) {
        keycodes[code] = false
      }

      for (const key in keys) {
        keys[key] = false
      }
    }
  }
}
