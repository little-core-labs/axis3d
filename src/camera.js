'use strict'

/**
 * Module dependencies.
 */

import { define, radians } from './utils'
import { Object3DCommand } from './object'
import { Vector } from './math'
import coalesce from 'defined'
import mat4 from 'gl-mat4'
import vec3 from 'gl-vec3'
import quat from 'gl-quat'

// Scratch matrix
const scratch = mat4.identity([])

/**
 * CameraCommand constructor.
 * @see CameraCommand
 */

module.exports = exports = (...args) => new CameraCommand(...args)

export const DEFAULT_CAMERA_FAR = 1000.0
export const DEFAULT_CAMERA_NEAR = 0.01
export const DEFAULT_CAMERA_FIELD_OF_VIEW = radians(60)
export const DEFAULT_CAMERA_ORIENTATION_ORIGIN = Object.freeze(
  // pitch, yaw, roll
  new Vector(radians(90), radians(0), radians(0))
)

export class CameraCommand extends Object3DCommand {
  constructor(ctx, opts = {}) {
    const worldUp = new Vector(0, 1, 0)
    const target = opts.target || new Vector(0, 0, 0)

    const right = new Vector(0, 0, 0) // computed
    const front = new Vector(0, 0, 0) // computed
    const up = new Vector(0, 0, 0) // computed

    const eye = new Vector(0, 0, 0)

    const orientation = Object.assign({}, DEFAULT_CAMERA_ORIENTATION_ORIGIN)
    const projection = mat4.identity([])
    const view = mat4.identity([])

    let viewportHeight = coalesce(opts.viewportHeight, 1)
    let viewportWidth = coalesce(opts.viewportWidth, 1)
    let near = coalesce(opts.near, DEFAULT_CAMERA_NEAR)
    let far = coalesce(opts.far, DEFAULT_CAMERA_FAR)
    let fov = coalesce(opts.fov, opts.fieldOfView, DEFAULT_CAMERA_FIELD_OF_VIEW)

    const context = {
      projection: () => projection,
      transform: () => mat4.identity([]),
      aspect: () => viewportWidth/viewportHeight,
      view: () => view,
    }

    const injectContext = ctx.regl({context})
    const update = (state) => {
      state = state || {}

      if (ctx.reglContext) {
        viewportHeight = coalesce(ctx.reglContext.viewportHeight, 1)
        viewportWidth = coalesce(ctx.reglContext.viewportWidth, 1)
      }

      if ('fov' in state) {
        fov = state.fov
      }

      if ('far' in state) {
        far = state.far
      }

      if ('near' in state) {
        near = state.near
      }

      if ('viewportWidth' in state) {
        viewportWidth = state.viewportWidth
      }

      if ('viewportHeight' in state) {
        viewportHeight = state.viewportHeight
      }

      if ('orientation' in state) {
        vec3.copy(orientation, state.orientation)
      }

      if ('target' in state) {
        vec3.copy(target, state.target)
      }

      if ('worldUp' in state) {
        vec3.copy(worldUp, state.worldUp)
      }

      const aspect = viewportWidth/viewportHeight
      const {
        position,
        rotation,
        scale,
      } = this

      // compute front vector from orientation euler
      vec3.set(front,
        Math.cos(orientation[0]) * Math.cos(orientation[1]),
        Math.sin(orientation[1]),
        Math.sin(orientation[0]) * Math.sin(orientation[1])
      )

      // normalize front vector and compute
      // corresponding right and worldUp vectors
      vec3.normalize(front, front)
      vec3.copy(right, vec3.normalize([], vec3.cross([], front, worldUp)))
      vec3.copy(up, vec3.normalize([], vec3.cross([], right, front)))

      // set projection
      // @TODO(werle) - mat4.orhto()
      mat4.perspective(projection, fov, aspect, near, far)

      // update view matrix with scaled
      // position and target vectors
      const center = vec3.multiply([], position || [0, 0, 0], scale)
      mat4.lookAt(view, center, vec3.multiply([], target, scale), up)

      // scale and rotate view matrix
      mat4.multiply(view, view, mat4.fromQuat([], rotation))
      mat4.scale(view, view, scale)

      // compute eye vector from the inverse view matrix
      mat4.invert(scratch, view)
      vec3.set(eye, eye[12], eye[13], eye[14])
    }

    super(ctx, {
      ...opts,
      draw(state, block) {
        let needsUpdate = false
        if ('function' == typeof state) {
          block = state
          state = {}
        } else if ('object' == typeof state) {
          needsUpdate = true
        }

				if (needsUpdate) {
          update(state)
        }

        injectContext(block)
      }
    })

    // initial update
    update({})

    //
    // Public properties
    //
    define(this, 'target', { get() { return target } })
    define(this, 'fov', { get() { return fov } })
  }
}
