'use strict'

/**
 * Module dependencies.
 */

import { BoxGeometry } from '../geometry/box'
import { MeshCommand } from '../mesh'
import mat4 from 'gl-mat4'
import glsl from 'glslify'

/**
 * Box function.
 *
 * @see BoxCommand
 */

module.exports = exports = (...args) => new BoxCommand(...args)

/**
 * BoxCommand class.
 *
 * @public
 * @class BoxCommand
 * @extends MeshCommand
 */

export class BoxCommand extends MeshCommand {
  constructor(ctx, opts = {}) {
    const geometry = new BoxGeometry(opts)
    super(ctx, { ...opts, type: 'box', geometry })
  }
}
