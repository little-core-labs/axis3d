'use strict';

import { Command } from './command'
import fullscreen from 'fullscreen'

export default (...args) => new FullscreenCommand(...args)

/*
 *  Fullscreen Command Function
 */

export class FullscreenCommand extends Command {

  constructor(ctx, opts = {}) {
    // set fullscreen to target canvas element  
    const fs = fullscreen(ctx.domElement)

    // fire fullscreen() call
    super((_, {enabled}) => {
      if(enabled) {
        fs.request()
      } else {
        fs.release()
      }
    })
  }
}