import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { UpdateContext } from '../update'
import { FrameContext } from './context'
import { FrameState } from './state'
import * as defaults from './defaults'

import { Entity } from '../core'

const noop = () => void 0

/**
 * Frame(ctx, initialState = {}) -> (args, scope) -> Any
 *
 * @public
 * @param {Context} ctx
 * @param {?Object} initialState
 * @return {Function}
 */
export function Frame(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  const injectFrame = Entity(ctx, initialState,
    FrameContext(ctx, initialState),
    FrameState(ctx, initialState),
  )

  const {frames = []} = initialState
  const getContext = ctx.regl({})
  const autoClear = Entity(ctx, initialState, UpdateContext(ctx, {
    update({clear}, args) {
      if (args && true === args.autoClear) {
        if ('function' == typeof clear) {
          return clear()
        }
      }
    }
  }))

  let loop = null // for all frames
  return (args, callback) => {
    ensureFrameLoopIsCreated()
    if ('function' == typeof args) {
      callback = args
      args = {}
    }
    return enqueueFrameCallback(args, callback)
  }

  function ensureFrameLoopIsCreated() {
    if (null == loop) {
      return createFrameLoop()
    }
  }

  function enqueueFrameCallback(args, callback) {
    const injectContext = ScopedContext(ctx, {frame: () => frame, frames, loop})
    const frame = createFrameCallback(callback, injectContext)
    return frames.push(frame)
  }

  function createFrameCallback(callback, components) {
    let cancelled = null
    let frame = null
    return frame = {
      cancel() { cancelled = true },
      onframe() {
        if (cancelled) {
          return frames.splice(frames.indexOf(frame, 1))
        } else try {
          return components(callback)
        } catch (err) {
          ctx.emit('error', err)
          return destroyFrameLoop()
        }
      }
    }
  }

  function createFrameLoop() {
    if (loop) { destroyFrameLoop() }
    injectFrame(dequeue)
    return loop = ctx.regl.frame(() => injectFrame(dequeue))
    function dequeue() {
      autoClear()
      try { for (const {onframe} of frames) { onframe() } }
      catch (err) {
        ctx.emit('error', err)
        try { for (const {cancel} of frames) { cancel() } }
        catch (err) { ctx.emit('error', err); }
        return destroyFrameLoop()
      }
    }
  }

  function destroyFrameLoop() {
    try { for (const f of frames) { f.cancel() } }
    catch (err) { ctx.emit('error', err); }
    frames.splice(0, frames.length)
    return loop.cancel()
  }
}
