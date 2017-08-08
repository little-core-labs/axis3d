import { assignDefaults, ensureRGBA, get } from '../utils'
import { Component } from '../core'
import * as defaults from './defaults'

export class MaterialState extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, MaterialState.defaults())
    super(ctx, initialState,
      ctx.regl({
        blend: {
          equation(ctx, args) {
            return get('equation', [
              args.blending,
              ctx.blending,
              initialState.blending
            ])
          },

          color(ctx, args) {
            return ensureRGBA(get('color', [
              args.blending,
              ctx.blending,
              initialState.blending
            ]))
          },

          enable(ctx, args) {
            return get('enable', [
              args.blending,
              ctx.blending,
              initialState.blending
            ])
          },

          func(ctx, args) {
            return get('func', [
              args.blending,
              ctx.blending,
              initialState.blending
            ])
          },
        },

        cull: {
          enable(ctx, args) {
            return Boolean(get('enable', [
              args.culling,
              ctx.culling,
              initialState.culling
            ]))
          },

          face(ctx, args) {
            return String(get('face', [
              args.culling,
              ctx.culling,
              initialState.culling
            ]))
          },
        },

        depth: {
          enable(ctx, args) {
            return Boolean(get('enable', [
              args.depth,
              ctx.depth,
              initialState.depth
            ]))
          },

          range(ctx, args) {
            return get('range', [
              args.depth,
              ctx.depth,
              initialState.depth
            ])
          },

          func(ctx, args) {
            return get('func', [
              args.depth,
              ctx.depth,
              initialState.depth
            ])
          },

          mask(ctx, args) {
            return get('mask', [
              args.depth,
              ctx.depth,
              initialState.depth
            ])
          },
        }
      })
    )
  }
}
