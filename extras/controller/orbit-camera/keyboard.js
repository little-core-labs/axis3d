'use strict'

/**
 * Module dependencies.
 */

import { radians } from '../../../src/utils'
import quat from 'gl-quat'

/**
 * Applies orientation changes to orbit orbitCamera from
 * keyboard input
 */

module.exports = exports = ({
  interpolationFactor,
  keyboardInput: keyboard,
  invert = false,
  damping,
  euler
} = {}) => {
  keyboard && keyboard(({keys}) => {
    const mappings = new KeyboardCommandMappings(keys)

    // @TODO(werle) - should we reset keyboard state ?
    if (mappings.value('control')) {
      return
    }

    if (mappings.value('up')) {
      if (invert) {
        euler[0] += 0.1*damping
      } else {
        euler[0] -= 0.1*damping
      }
    } else if (mappings.value('down')) {
      if (invert) {
        euler[0] -= 0.1*damping
      } else {
        euler[0] += 0.1*damping
      }
    }

    if (mappings.value('left')) {
      if (invert) {
        euler[1] += 0.08*damping
      } else {
        euler[1] -= 0.08*damping
      }
    } else if (mappings.value('right')) {
      if (invert) {
        euler[1] -= 0.08*damping
      } else {
        euler[1] += 0.08*damping
      }
    }
  })
}

class KeyboardCommandMappings {
  constructor(keys = {}, extension = {mapping: {}}) {
    this.keys = keys
    this.map = {
      ...extension.mapping,
      up: ['up', ...(extension.mapping.up || [])],
      down: ['down', ...(extension.mapping.down || [])],
      left: ['left', ...(extension.mapping.left || [])],
      right: ['right', ...(extension.mapping.right || [])],
      control: [
        'right command', 'right control',
        'left command', 'left control',
        'control', 'super', 'ctrl', 'alt', 'fn',
        ...(extension.mapping.control || [])
      ],
    }
  }

  value(which) {
    return this.map[which].some((key) => Boolean(this.keys[key]))
  }
}
