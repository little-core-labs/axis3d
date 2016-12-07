'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from '../math'
import { Command } from '../command'
import { define } from '../utils'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

/**
 * Static vectors used for reference in
 * quaternion axis rotations.
 *
 */

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

  /**
   * AbstractControllerCommand class contructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, {
    interpolationFactor = 1,
    orientation = new Vector(0, 0, 0),
    rotation = new Quaternion(),
    update = () => void 0,
    target = null,
    source = null,
    // @TODO(werle) - find a better name for this
    sloppy = false,
  } = {}) {
    //
    // slerp using sloppy rotation or with standard
    // slerp = f(r, Qx * Qy * Qz, t)
    //
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

      if ('interpolationFactor' in state) { interpolationFactor = state.interpolationFactor }
      if ('update' in state) { update = state.update }
      if ('target' in state) { target = state.target }
      if ('source' in state) { source = state.source }
      if ('sloppy' in state) { sloppy = state.sloppy }

      if ('orientation' in state) {
        Object.assign(orientation, state.orientation)
      }

      update({
        ...state,
        interpolationFactor,
        orientation,
        update,
        target,
        source,
        sloppy,
      }, (...args) => {
        if (target) {
          // slerp rotation quaternion from orientation
          // angles and a given interpolation factor
          slerp(rotation, orientation, interpolationFactor)

          // update target state
          target({rotation})
        }

        // maintain block scope
        block(...args)
      })
    })
  }
}
