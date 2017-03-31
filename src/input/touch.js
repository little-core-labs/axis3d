'use strict'

/**
 * Module dependencies.
 */

import { registerStat } from '../stats'
import { Command } from '../core/command'

import { emitter as TouchPositionEmitter } from 'touch-position'
import events from 'dom-events'
import raf from 'raf'

/**
 * The TouchInput class represents a stateless interface for capturing touch
 * state for a given context.
 *
 * @public
 * @class TouchInput
 * @extends Command
 * @see Command
 */

export class TouchInput extends Command {

  /**
   * TouchInput class constructor.
   *
   * @public
   * @constructor
   * @param {Context} ctx Axis3D context object.
   * @param {?Object} opts Constructor options.
   */

  constructor(ctx, {} = {}) {
    registerStat('TouchInput')

    super(update)

    /**
     * Encapsulated touch coordinate and
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

    const touch = {
      touches: null,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      prevX: 0,
      prevY: 0,
    }

    /**
     * Emits touch movement coordinates.
     *
     * @private
     * @type {Object}
     */

    const touchListener = TouchPositionEmitter({element: ctx.domElement})

    // bind touch listeners
    touchListener.on('move',  ontouchmove)
    events.on(ctx.domElement, 'touchstart', ontouchstart)
    events.on(ctx.domElement, 'touchend', ontouchend)

    // remove listeners when context is destroyed
    ctx.once('destroy', () => {
      touchListener.dispose()
      events.of(ctx.domElement, 'touchstart', ontouchstart)
      events.of(ctx.domElement, 'touchend', ontouchend)
    })

    /**
     * Handles touch start events
     *
     * @private
     * @function
     * @param {Event} e
     */

    function ontouchstart(e) {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      e.preventDefault()
      touch.touches = e.targetTouches
      touch.currentX = x
      touch.currentY = y
      touch.deltaX = 0
      touch.deltaY = 0
      touch.prevX = 0
      touch.prevY = 0
    }

    /**
     * Handles touch end events
     *
     * @private
     * @function
     * @param {Event} e
     */

    function ontouchend(e) {
      e.preventDefault()
      raf(() => {
        touch.touches = null
        touch.currentX = 0
        touch.currentY = 0
        touch.deltaX = 0
        touch.deltaY = 0
        touch.prevX = 0
        touch.prevY = 0
      })
    }

    /**
     * Handles touch movement events
     *
     * @private
     * @function
     * @param {Event} e
     */

    function ontouchmove({clientX, clientY}) {
      synchronizeTouch(clientX, clientY)
    }

    /**
     * Touch command update function.
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
        ...touch,
      })
    }

    /**
     * Synchronizes touch state
     *
     * @private
     * @function
     * @param {Number} x X coordinate value of touch.
     * @param {Number} y Y coordinate value of touch.
     */

    function synchronizeTouch(x, y) {
      // reset delta on next frame
      raf(() => {
        touch.deltaX = 0
        touch.deltaY = 0
      })

      // update touch state if x or y input coordinate values
      // are different than the current x or y touch coordinate
      // values
      if (touch.currentX != x && touch.currentY != y) {
        touch.prevX = touch.currentX
        touch.prevY = touch.currentY
        touch.deltaX = x - touch.currentX
        touch.deltaY = y - touch.currentY
        touch.currentX = x
        touch.currentY = y
      }
    }
  }
}
