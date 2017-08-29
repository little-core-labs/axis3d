import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { Component } from '../core'

export class FrameBuffer extends Component {
  static defaults() { return { depth: true } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, FrameBuffer.defaults())
    const getContext = new ScopedContext(ctx)
    const fbo = ctx.regl.framebuffer({ ...initialState })
    const framebuffer = ctx.regl({ framebuffer: fbo})
    let previousWidth = 0
    let previousHeight = 0
    super(ctx,
      initialState,
      new ScopedContext(ctx, {
        framebufferPointer() { return framebuffer }
      }),
      (state, block) => {
        getContext(({texturePointer, viewportWidth, viewportHeight}) => {
          const width = state.width || viewportWidth
          const height = state.height || viewportHeight
          if (texturePointer) {
            texturePointer({
              width, height,
              wrap: 'clamp', min: 'linear', mag: 'linear', ...state.texture
            })
            fbo({color: texturePointer})
          }

          if (previousWidth != width || previousHeight != height) {
            previousWidth = width
            previousHeight = height
            fbo.resize(width, height)
          }

          framebuffer(block)
        })
      })
  }
}
