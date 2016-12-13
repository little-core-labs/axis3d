'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from '../math'
import { Command } from '../command'
import { define } from '../utils'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

//
// Static vectors used for reference in
// quaternion axis rotations.
//
const XVECTOR = new Vector(1, 0, 0)
const YVECTOR = new Vector(0, 1, 0)
const ZVECTOR = new Vector(0, 0, 1)

/**
 * AbstractControllerCommand class.
 *
 * @public
 * @abstract
 * @class AbstractControllerCommand
 * @extends Command
 */

export class AbstractControllerCommand extends Command {
  constructor(ctx, {
    interpolationFactor = 1,
    orientation = new Vector(0, 0, 0),
    rotation = new Quaternion(),
    update = (_, f) => f(void 0),
    source = null,
    sloppy = false, // @TODO(werle) - find a better name for this
  } = {}) {
    const slerp = (...args) => {
      if (sloppy) {
        Quaternion.sloppySlerpTargetFromAxisAngles(...args)
      } else {
        Quaternion.slerpTargetFromAxisAngles(...args)
      }
    }

    super((_, state, block) => {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || function() {}

      if ('interpolationFactor' in state) {
        interpolationFactor = state.interpolationFactor
      }

      if ('orientation' in state) {
        Object.assign(orientation, state.orientation)
      }

      if ('update' in state) {
        update = state.update
      }

      if ('source' in state) {
        source = state.source
      }

      if ('sloppy' in state) {
        sloppy = state.sloppy
      }

      // slerp rotation quaternion from orientation
      // angles and a given interpolation factor
      slerp(rotation, orientation, interpolationFactor)
      update({
        ...state,
        interpolationFactor,
        orientation,
        rotation,
        source,
        sloppy,
      }, block)
    })
  }
}
