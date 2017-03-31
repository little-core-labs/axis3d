'use strict'

/**
 * Module dependencies.
 */

import { radians } from 'axis3d/utils'
import quat from 'gl-quat'

/**
 * Applies orientation changes to orbit orbitCamera from
 * keyboard input
 */

module.exports = exports = ({
  interpolationFactor,
  keyboardInput: keyboard,
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
      euler[0] -= 0.1*damping
    } else if (mappings.value('down')) {
      euler[0] += 0.1*damping
    }

    if (mappings.value('left')) {
      euler[1] -= 0.08*damping
    } else if (mappings.value('right')) {
      euler[1] += 0.08*damping
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
