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
    super(ctx,
      initialState,
      new ScopedContext(ctx, {
        framebufferPointer() { return framebuffer }
      }),
      (state, block) => {
        getContext(({texturePointer, viewportWidth, viewportHeight}) => {
          texturePointer({
            width: viewportWidth,
            height: viewportHeight,
            wrap: 'clamp'
          })
          fbo({color: texturePointer})
          fbo.resize(viewportWidth, viewportHeight)
          framebuffer(block)
        })
      })
  }
}
