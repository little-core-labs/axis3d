'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'
import onMouseChange from 'mouse-change'
import onMouseWheel from 'mouse-wheel'
import { Command } from '../command'
import events from 'dom-events'
import raf from 'raf'

module.exports = exports = (...args) => new MouseInputCommand(...args)
export class MouseInputCommand extends Command {
  constructor(ctx, { allowWheel = true } = {}) {
    registerStat('MouseInput')

    const wheel = {
      currentX: 0, currentY: 0,
      deltaX: 0, deltaY: 0,
      prevX: 0, prevY: 0,
    }

    let currentX = 0
    let currentY = 0
    let buttons = 0
    let deltaX = 0
    let deltaY = 0
    let prevX = 0
    let prevY = 0

    ctx.on('blur', () => { buttons = 0 })

    // focus/blur context on mouse down
    events.on(document, 'mousedown', (e) => {
      if (e.target == ctx.domElement) {
        ctx.focus()
      } else {
        ctx.blur()
      }
    })

    // update state on mouse change and reset
    // delta values on next animation frame
    onMouseChange(ctx.domElement, (b, x, y) => {
      synchronizeMouse(b, x, y)
    })

    // update mouse wheel deltas and then
    // reset them on the next animation frame
    onMouseWheel(ctx.domElement, (dx, dy, dz) => {
      if (false === allowWheel) { return }
      Object.assign(wheel, {
        currentX: wheel.currentX + dx,
        currentY: wheel.currentY + dy,
        currentZ: wheel.currentZ + dz,
        deltaX: dx,
        deltaY: dy,
        deltaZ: dz,
        prevX: wheel.currentX,
        prevY: wheel.currentY,
        prevZ: wheel.currentZ,
      })

      raf(() => Object.assign(wheel, {
        deltaX: 0,
        deltaY: 0,
        deltaZ: 0,
      }))
    })

    super((state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      if ('allowWheel' in state) { allowWheel = state.allowWheel }
      if ('currentX' in state) { currentX = state.currentX }
      if ('currentY' in state) { currentY = state.currentY }

      synchronizeMouse(buttons, currentX, currentY)

      block({
        ...state,
        allowWheel,
        currentX,
        currentY,
        buttons,
        deltaX,
        deltaY,
        prevX,
        prevY,
        wheel,
      })
    })

    function synchronizeMouse(b, x, y) {
      buttons = b

      if (currentX == x && currentY == y) {
        return
      }

      prevX = currentX
      prevY = currentY
      deltaX = x - currentX
      deltaY = y - currentY
      currentX = x
      currentY = y

      raf(() => {
        deltaX = 0
        deltaY = 0
      })
    }
  }
}
