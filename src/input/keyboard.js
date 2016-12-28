
'use strict'
/**
 * Module dependencies.
 */

import { Command } from '../command'
import keycode from 'keycode'
import events from 'dom-events'

/**
 * Keyboard function.
 *
 * @see KeyboardCommand
 */

module.exports = exports = (...args) => new KeyboardCommand(...args)

export class KeyboardCommand extends Command {
  constructor(ctx, opts = {}) {
    const keycodes = {}
    const keys = {}
    const mappings = new KeyboardCommandMappings(keys, {
      mapping: opts.mapping || {}
    })

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
  }
}

export class KeyboardCommandMappings {
  constructor(keys = {}, extension = {mapping: {}}) {
    this.keys = keys
    this.map = {
      ...extension.mapping,
      up: ['up', ...(extension.mapping.up || [])],
      down: ['down', ...(extension.mapping.down || [])],
      left: ['left', ...(extension.mapping.left || [])],
      right: ['right', ...(extension.mapping.right || [])],
      control: [
        'right command',
        'right control',
        'left command',
        'left control',
        'control',
        'super',
        'ctrl',
        'alt',
        'fn',
        ...(extension.mapping.control || [])
      ],
    }
  }

  on(which) {
    return this.map[which].map((key) => this.keys[key] = true)
  }

  off(which) {
    return this.map[which].map((key) => this.keys[key] = false)
  }

  value(which) {
    return this.map[which].some((key) => Boolean(this.keys[key]))
  }
}
