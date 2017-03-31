'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'
import { Command } from '../core/command'

import onMouseChange from 'mouse-change'
import onMouseWheel from 'mouse-wheel'
import coalesce from 'defined'
import events from 'dom-events'
import raf from 'raf'

/**
 * The MouseInput class represents a stateless interface for capturing
 * mouse state for a given context.
 *
 * @public
 * @class MouseInput
 * @extends Command
 * @see Command
 */

export class MouseInput extends Command {

  /**
   * MouseInput class constructor.
   *
   * @public
   * @constructor
   * @param {Context} ctx Axis3D context object.
   * @param {?Object} opts Constructor options.
   * @param {?Boolean} opts.allowWheel Indicates if wheel should be ignored.
   */

  constructor(ctx, {allowWheel = true} = {}) {
    registerStat('MouseInput')

    // set update function
    super(update)

    /**
     * Encapsulated mouse wheel state.
     *
     * @private
     * @type {Object}
     * @property {Number} currentX
     * @property {Number} currentY
     * @property {Number} deltaX
     * @property {Number} deltaY
     * @property {Number} prevX
     * @property {Number} prevY
     */

    const wheel = {
      currentX: 0, currentY: 0,
      deltaX: 0, deltaY: 0,
      prevX: 0, prevY: 0,
    }

    /**
     * Encapsulated mouse coordinate and
     * button state.
     *
     * @private
     * @type {Object}
     * @property {Number} buttons
     * @property {Number} currentX
     * @property {Number} currentY
     * @property {Number} deltaX
     * @property {Number} deltaY
     * @property {Number} prevX
     * @property {Number} prevY
     */

    const mouse = {
      buttons: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      prevX: 0,
      prevY: 0,
    }

    // unset buttons when context loses focus
    ctx.on('blur', () => { mouse.buttons = 0 })

    // update state on mouse change and reset
    // delta values on next animation frame
    const mouseChangeListener = onMouseChange(ctx.domElement, onmousechange)

    // update mouse wheel deltas and then
    // reset them on the next animation frame
    const mouseWheelListener = onMouseWheel(ctx.domElement, onmousewheel)

    // remove listeners when context is destroyed
    ctx.once('destroy', () => {
      mouseChangeListener.enabled = false
      events.off(ctx.domElement, mouseWheelListener)
    })

    /**
     * Handles mouse change events
     *
     * @private
     * @function
     * @see {@link https://github.com/mikolalysenko/mouse-change}
     */

    function onmousechange(b, x, y) {
      synchronizeMouse(b, x, y)
    }

    /**
     * Handles mouse wheel events
     *
     * @private
     * @function
     * @see {@link https://github.com/mikolalysenko/mouse-wheel}
     */

    function onmousewheel(dx, dy, dz) {
      if (false === allowWheel) { return }
      synchronizeMouseWheel(dx, dy, dz)
    }

    /**
     * Mouse command update function.
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

        wheel,
        allowWheel: coalesce(state.allowWheel, allowWheel),

        ...({
          ...mouse,
          currentX: coalesce(state.currentX, mouse.currentX),
          currentY: coalesce(state.currentY, mouse.currentY),
        }),
      })
    }

    /**
     * Synchronizes mouse state
     *
     * @private
     * @function
     * @param {Number} b Number of buttons pressed.
     * @param {Number} x X coordinate value of mouse.
     * @param {Number} y Y coordinate value of mouse.
     */

    function synchronizeMouse(b, x, y) {
      mouse.buttons = b
      // reset delta on next frame
      raf(() => {
        mouse.deltaX = 0
        mouse.deltaY = 0
      })

      // update mouse state if x or y input coordinate values
      // are different than the current x or y mouse coordinate
      // values
      if (mouse.currentX != x || mouse.currentY != y) {
        mouse.prevX = mouse.currentX
        mouse.prevY = mouse.currentY
        mouse.deltaX = x - mouse.currentX
        mouse.deltaY = y - mouse.currentY
        mouse.currentX = x
        mouse.currentY = y
      }
    }

    /**
     * Synchronizes mouse wheel state
     *
     * @private
     * @function
     * @param {Number} dx Delta X wheel position.
     * @param {Number} dy Delta Y wheel position.
     * @param {Number} dz Delta Z wheel position.
     */

    function synchronizeMouseWheel(dx, dy, dz) {
      // reset deltas on next frame
      raf(() => Object.assign(wheel, {
        deltaX: 0,
        deltaY: 0,
        deltaZ: 0,
      }))

      const {
        currentX,
        currentY,
        currentZ,
      } = wheel

      Object.assign(wheel, {
        currentX: currentX + dx,
        currentY: currentY + dy,
        currentZ: currentZ + dz,
        deltaX: dx,
        deltaY: dy,
        deltaZ: dz,
        prevX: currentX,
        prevY: currentY,
        prevZ: currentZ,
      })
    }
  }
}
