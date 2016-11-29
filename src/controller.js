'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector } from './math'
import { Command } from './command'
import { define } from './utils'
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
 * ControllerCommand class.
 *
 * @public
 * @abstract
 * @class ControllerCommand
 * @extends Command
 */

export class ControllerCommand extends Command {

  /**
   * ControllerCommand class contructor.
   *
   * @param {Context} ctx
   * @param {Object} opts
   */

  constructor(ctx, opts = {}, update = () => void 0) {
    const state = Object.assign({
      interpolationFactor: 1,
      orientation: Object.assign(new Vector(0, 0, 0), opts.orientation),
      sloppy: false,
    }, opts)

    let rotation = new Quaternion()
    let target = opts.target || null
    let source = opts.source || null

    super((_, updates) => {
      if (updates && 'target' in updates) {
        target = updates.target
      }

      if (updates && 'source' in updates) {
        source = updates.source
      }

      update(_, {...state}, target, source)
      updateState(updates)
      syncTarget()

      if ('function' == typeof updates) {
        updates(_)
      }

    })

    const updateState = (updates) => {
      if (updates && 'object' == typeof updates) {
        Object.assign(state, updates, {
          orientation: Object.assign(state.orientation, updates.orientation),
        })
      }
    }

    const syncTarget = () => {
      rotateTarget()
    }

    const rotateTarget = () => {
      const slerp = state.sloppy ?
        Quaternion.sloppySlerpTargetFromAxisAngles :
        Quaternion.slerpTargetFromAxisAngles
      slerp(rotation, state.orientation, state.interpolationFactor)
    }

    /**
     * .target getter.
     *
     * @public
     * @getter
     * @type {MeshCommand}
     */

    define(this, 'target', { get: () => target })

    /**
     * .rotation getter.
     *
     * @public
     * @getter
     * @type {MeshCommand}
     */

    define(this, 'rotation', { get: () => rotation })

    /**
     * .source getter.
     *
     * @public
     * @getter
     * @type {MeshCommand}
     */

    define(this, 'source', { get: () => source })

    /**
     * .orientation getter.
     *
     * @public
     * @getter
     * @type {Vector}
     */

    define(this, 'orientation', { get: () => state.orientation })

    /**
     * .interpolationFactor getter.
     *
     * @public
     * @getter
     * @type {Vector}
     */

    define(this, 'interpolationFactor', { get: () => state.interpolationFactor })
  }
}
