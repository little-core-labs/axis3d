import { assignDefaults, ensureRGBA, pick } from '../utils'
import { ScopedState } from '../scope'
import * as defaults from './defaults'

export function MaterialState(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return ScopedState(ctx, initialState, {
    blend: {
      equation(ctx, args) {
        return pick('equation', [
          args.blending,
          ctx.blending,
          initialState.blending
        ])
      },

      color(ctx, args) {
        return ensureRGBA(pick('color', [
          args.blending,
          ctx.blending,
          initialState.blending
        ]))
      },

      enable(ctx, args) {
        return pick('enable', [
          args.blending,
          ctx.blending,
          initialState.blending
        ])
      },

      func(ctx, args) {
        return pick('func', [
          args.blending,
          ctx.blending,
          initialState.blending
        ])
      },
    },

    cull: {
      enable(ctx, args) {
        return Boolean(pick('enable', [
          args.culling,
          ctx.culling,
          initialState.culling
        ]))
      },

      face(ctx, args) {
        return String(pick('face', [
          args.culling,
          ctx.culling,
          initialState.culling
        ]))
      },
    },

    depth: {
      enable(ctx, args) {
        if ('boolean' == typeof args.depth) {
          return args.depth
        }
        return Boolean(pick('enable', [
          args.depth,
          ctx.depth,
          initialState.depth
        ]))
      },

      range(ctx, args) {
        return pick('range', [
          args.depth,
          ctx.depth,
          initialState.depth
        ])
      },

      func(ctx, args) {
        return pick('func', [
          args.depth,
          ctx.depth,
          initialState.depth
        ])
      },

      mask(ctx, args) {
        return pick('mask', [
          args.depth,
          ctx.depth,
          initialState.depth
        ])
      },
    }
  })
}
