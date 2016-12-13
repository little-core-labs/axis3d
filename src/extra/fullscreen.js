'use strict';

/**
 * Module dependencies.
 */

import { Command } from '../command'
import fullscreen from 'fullscreen'

/**
 * FullscreenCommand constructor.
 * @see FullscreenCommand
 */

module.exports = exports = (...args) => new FullscreenCommand(...args)

/**
 * Fullscreen class.
 *
 * @public
 * @class FullscreenComand
 * @extends Command
 */

export class FullscreenCommand extends Command {

  /**
   * FullscreenCommand class constructor that toggles
   * fullscreen view
   *
   * @constructor
   * @param {Object} ctx
   * @param {Object} [opts]
   */

  constructor(ctx) {
    // set fullscreen to target canvas element
    const fs = fullscreen(ctx.domElement)

    // toggle fullscreen
    super((_, {enabled}) => {
      if (enabled) {
        fs.request()
      } else {
        fs.release()
      }
    })
  }
}
