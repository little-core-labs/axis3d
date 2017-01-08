'use strict'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

import * as types from './types'

import {
  TextureCommand
} from '../texture'

import {
  incrementStat
} from '../stats'

import {
  Command
} from '../command'

const kDefaultFragmentShader =
  glslify(__dirname + '/../glsl/material/fragments/main.glsl', {
    transform: ['glslify-fancy-imports']
  })

module.exports = exports = (...args) => new MaterialCommand(...args)
export class MaterialCommand extends Command {
  constructor(ctx, initialState = {}) {
    incrementStat('Material')

    let {
      transparent: initialTransparent = false,
      blending = {},
      opacity: initialOpacity = 1.0,
      culling = {},
      shader = kDefaultFragmentShader,
      color: initialColor = [100/255, 110/255, 255/255, 1],
      depth = {},
      type = types.Material,
      map: initialMap = null
    } = initialState
    const {regl} = ctx

    const initialBlending = {
      equation: 'add',
      enable: true,
      color: [0, 0, 0, 1],
      func: {src: 'src alpha', dst: 'one minus src alpha'},
      ...blending,
    }

    if ('boolean' == typeof blending)  {
      initialBlending.enable = blending
    }

    if ('boolean' == typeof initialTransparent) {
      initialBlending.enable = initialTransparent
    }

    const initialCulling = {
      enable: true,
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

    // configurable
    blending = { ...initialBlending }
    culling = { ...initialCulling }
    depth = { ...initialDepth }

    const emptyTexture = regl.texture()
    const uniforms = {
      'material.opacity': ({}, {opacity = initialOpacity} = {}) => opacity,
      'material.color': ({}, {color = initialColor} = {}) => color,
      'material.type': () => type || types.Material,

      'map.resolution': ({textureResolution, textureData}) => {
        if (textureData) {
          return textureResolution || [0, 0]
        } else {
          return [0, 0]
        }
      },
      'map.data': ({texture, textureData}) => {
        if (textureData) {
          return texture
        } else {
          return emptyTexture
        }
      },

      ...initialState.uniforms
    }

    const typeName = Object.keys(types).find((key) => type == types[key])
    const shaderDefines = {
      [`use${typeName}`]: 1, // `useLambertMaterial', etc
      MATERIAL_TYPE: typeName, // `LambertMaterial', etc

      ...initialState.shaderDefines
    }

    if (null != initialMap) {
      shaderDefines.HAS_MAP = 1
    }

    for (let key in types) {
      shaderDefines[`${key}Type`] = types[key]
    }

    for (let key in shaderDefines) {
      shader = `#define ${key} ${shaderDefines[key]}\n`+shader
    }

    const injectMapContext = regl({
      context: {
        map: ({}, args = {}) => {
          const {
            map = initialMap
          } = (args || {})
          return map
        },
      }
    })

    const injectContext = regl({
      uniforms,
      frag: shader,
      blend: {
        equation: ({}, {opacity, transparent} = {}) =>  blending.equation,
        enable: ({}, {
          transparent = coalesce(initialTransparent, blending.enable),
          blending: blend = blending.enable,
          opacity = initialOpacity,
        } = {}) => {
          if (opacity < 1.0 || transparent) {
            return true
          } else if ('boolean' == typeof blend) {
            return blend
          } else {
            return transparent
          }
        },

        color: () => blending.color,
        func: ({}, {
          transparent = initialTransparent,
            opacity = initialOpacity
        } = {}) => {
          if (opacity < 1.0 || transparent) {
            return {src: 'src alpha', dst: 'one'}
          } else {
            return blending.func
          }
        },
      },

      cull: {
        enable: () => culling.enable,
        face: () => culling.face,
      },

      depth: {
        enable: () => depth.enable,
        range: () => depth.range,
        func: () => depth.func,
        mask: ({}, {opacity = opacity, transparent} = {}) => {
          if (opacity < 1.0 || transparent) {
            return true
          } else {
            return depth.mask
          }
        },
      },

      context: {
        materialOpacity: ({}, {opacity = initialOpacity} = {}) => opacity,
        materialType: () => type || types.Material,
        materialColor: ({
          color: materialColor
        }, {
          color = materialColor || initialColor
        } = {}) => {
            return color
        },

        mapResolution: ({textureResolution}) => textureResolution || [0, 0],
        mapData: ({texture}, {map = initialMap} = {}) => texture || map,
      }
    })


    super((state, block) => {
      const noop = () => void 0

      if ('function' == typeof state) {
        block = state
        state = {}
      }

      if (Array.isArray(state)) {
        state = [ ...state ]
      } else {
        state = { ...(state || {}) }
      }

      block = block || noop

      const mapState = Array.isArray(state) ? {} : state.map
      injectMapContext(mapState || {}, ({map} = {}) => {
        if ('function' == typeof map) {
          map(() => {
            injectContext(state, block)
          })
        } else {
          injectContext(state, block)
        }
      })
    })
  }
}
