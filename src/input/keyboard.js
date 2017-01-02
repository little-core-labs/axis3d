'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'
import { Command } from '../command'
import keycode from 'keycode'
import events from 'dom-events'

module.exports = exports = (...args) => new KeyboardInputCommand(...args)
export class KeyboardInputCommand extends Command {
  constructor(ctx, opts = {}) {
    registerStat('KeyboardInput')

    const keycodes = {}
    const keys = {}

    // update keydown states
    events.on(document, 'keydown', (e) => {
      if (false == ctx.hasFocus) return
      const code = e.which || e.keyCode || e.charCode
      if (null != code) {
        // set key code
        keycodes[code] = true
        // set key name
        keys[keycode(code)] = true
      }
    }, false)

    // update keyup states
    events.on(document, 'keyup', (e) => {
      if (false == ctx.hasFocus) return
      const code = e.which || e.keyCode || e.charCode
      if (null != code) {
        // set key code
        keycodes[code] = false
        // set key name
        keys[keycode(code)] = false
      }
    }, false)

    ctx.on('blur', () => { reset() })
    super((state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}
      block({ ...state, keycodes, keys })
    })

    function reset() {
      for (let code in keycodes) {
        keycodes[code] = false
      }

      for (let key in keys) {
        keys[key] = false
      }
    }
  }
}

