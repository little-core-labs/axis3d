'use strict'

import { TextureCommand } from './texture'
import { incrementStat } from './stats'
import { Command } from './command'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

const kDefaultFragmentShader = glslify(__dirname + '/glsl/material/frag.glsl')

module.exports = exports = (...args) => new MaterialCommand(...args)
export class MaterialCommand extends Command {
  constructor(ctx, {
    blending = {},
    opacity = 1.0,
    culling = {},
    shader = kDefaultFragmentShader,
    color = [100/255, 110/255, 255/255, 1],
    depth = {},
    map = null
  } = {}) {
    incrementStat('Material')

    const {regl} = ctx

    const initialMap = map || new TextureCommand(ctx)
    const initialColor = color
    const initialOpacity = opacity

    const initialBlending = {
      equation: 'add',
      enable: true,
      color: [0, 0, 0, 1],
      func: {src: 'src alpha', dst: 'one minus src alpha'},
      ...blending,
    }

    const initialCulling = {
      enable: false,
      face: 'back',
      ...culling
    }

    const initialDepth = {
      enable: true,
      range: [0, 1],
      mask: true,
      func: 'less',
      ...depth,
    }

    const uniforms = {
      mapResolution: ({textureResolution}) => textureResolution || [0, 0],
      opacity: ({}, {opacity = initialOpacity} = {}) => opacity,
      color: ({}, {color = initialColor} = {}) => color,
      map: ({texture}, {map = initialMap} = {}) => texture || map,
    }

    const injectContext = regl({
      uniforms,
      frag: shader,

      blend: {
        equation: () => blending.equation,
        enable: () => blending.enable,
        color: () => blending.color,
        func: () => blending.func,
      },

      cull: {
        enable: () => culling.enable,
        face: () => culling.face,
      },

      depth: {
        enable: () => depth.enable,
        range: () => depth.range,
        mask: () => depth.mask,
        func: () => depth.func,
      },
    })

    //
    // configurable
    //
    blending = { ...initialBlending }
    culling = { ...initialCulling }
    opacity = initialOpacity
    depth = { ...initialDepth }
    color = [ ...initialColor ]
    map = initialMap

    super((state, block) => {
      const noop = () => void 0

      if ('function' == typeof state) {
        block = state
        state = {}
      }

      state = state || {}
      block = block || noop

      blending = { ...initialBlending }
      culling = { ...initialCulling }
      depth = { ...initialDepth }
      color = [ ...initialColor ]
      map = initialMap

      if ('blending' in state) {
        Object.assign(blending, state.blending)
      }

      if ('culling' in state) {
        Object.assign(culling, state.culling)
      }

      if ('depth' in state) {
        Object.assign(depth, state.depth)
      }

      if ('color' in state) {
        vec4.copy(color, state.color)
      }

      if ('map' in state) {
        map = state.map
      }

      if ('function' == typeof map) {
        map(({textureResolution}) => {
          injectContext(state, block)
        })
      } else {
        injectContext(state, block)
      }
    })
  }
}
