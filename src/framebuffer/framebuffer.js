import { framebuffer as extend } from 'regl-extend'
import { assignDefaults } from '../utils'
import { ScopedContext } from '../scope'
import { Entity } from '../core'

export function FrameBuffer(ctx, initialState = {}) {
  assignDefaults(initialState, {depth: true})
  const getContext = ctx.regl({})
  const fbo = ctx.regl.framebuffer(extend(initialState))
  const framebuffer = ctx.regl({framebuffer: fbo})
  let previousTexture = null
  let previousWidth = 0
  let previousHeight = 0
  return Entity(ctx, initialState,
    ScopedContext(ctx, { framebufferPointer() { return framebuffer } }),
    (args, next) => {
      getContext(args, update)
      framebuffer(({clear}) => {
        clear()
        next()
      })
    }
  )

  function update({texturePointer, drawingBufferWidth, drawingBufferHeight}, args) {
    const width = args.width || drawingBufferWidth
    const height = args.height || drawingBufferHeight
    if (texturePointer && previousTexture != texturePointer) {
      previousTexture = texturePointer
      texturePointer({
        width, height, wrap: 'clamp', min: 'linear', mag: 'linear',
        ...args.texture
      })
      fbo({color: texturePointer})
    }

    if (previousWidth != width || previousHeight != height) {
      previousWidth = width
      previousHeight = height
      fbo.resize(width, height)
    }
  }
}
