
'use strict'
/**
 * Module dependencies.
 */

import { Command } from '../command'
import { define } from '../utils'
import keycode from 'keycode'
import events from 'dom-events'
import raf from 'raf'

/**
 * Keyboard function.
 *
 * @see KeyboardCommand
 */

module.exports = exports = (...args) => new KeyboardCommand(...args)

/**
 * KeyboardCommand class
 *
 * @public
 * @class KeyboardCommand
 * @extends Command
 */

export class KeyboardCommand extends Command {

  /**
   * KeyboardCommand class constructor.
   *
   * @param {Context} ctx
   * @param {Object} [opts]
   */

  constructor(ctx, opts = {}) {
    const keycodes = {}
    const keys = {}

    const mappings = {
      up: ['up', 'w'],
      down: ['down', 's'],
      left: ['left', 'a'],
      right: ['right', 'd'],
      control: [
        'control',
        'right command', 'left command',
        'right control', 'left control',
        'super', 'ctrl', 'alt', 'fn',
      ],

      on(which) {
        return this[which].map((key) => keys[key] = true)
      },

      off(which) {
        return this[which].map((key) => keys[key] = false)
      },

      value(which) {
        return this[which].some((key) => Boolean(keys[key]))
      },
    }

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
    super((_, state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}
      block({
        ...state,
        mappings,
        keycodes,
        keys,
      })
    })

    function reset() {
      for (let code in keycodes) {
        keycodes[code] = false
      }

      for (let key in keys) {
        keys[key] = false
      }
    }

    //
    // Public properties.
    //
    define(this, 'aliasMappings', { get: () => mappings })
    define(this, 'keycodes', { get: () => keycodes })
    define(this, 'keys', { get: () => keys })
    define(this, 'isKeydown', {
      get: () => Object.keys(keys).some((key) => keys[key])
    })
  }
}
