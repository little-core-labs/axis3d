'use strict'

import { ShaderUniforms, DynamicValue } from './gl'
import { ensureRGBA, isArrayLike } from '../utils'
import { assignTypeName } from './types'
import { incrementStat } from '../stats'
import { Command } from './command'
import { Texture } from './texture'
import { Color } from './color'
import * as types from '../material/types'
import { typeOf } from './types'

import {
  kMaxDirectionalLights,
  kMaxAmbientLights,
  kMaxPointLights,
} from '../light/limits'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

let MATERIAL_COMMAND_NEXT_ID = 0x6d

export const kDefaultMaterialType = types.MaterialType
export const kDefaultMaterialColor = new Color(100/255, 110/255, 255/255)
export const kDefaultMaterialOpacity = 1

export const kDefaultMaterialFragmentShader =
  glslify(__dirname + '/../glsl/material/fragments/main.glsl', {
    transform: ['glslify-fancy-imports']
  })

export const kDefaultMaterialBlendingState = {
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' },
}

export const kDefaultMaterialCullingState = {
  enable: false,
  face: 'back',
}

export const kDefaultMaterialDepthState = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true,
}

export class Material extends Command {
  static id() {
    return MATERIAL_COMMAND_NEXT_ID ++
  }

  static typeName(type) {
    return coalesce(
      Object.keys(types).find((k) => type == types[k]),
      type,
      'Material')
      .replace(/Type$/, '')
  }

  constructor(ctx, initialState = {}) {
    super(update)
    incrementStat('Material')
    assignTypeName(this, 'material')

    const {uniforms = new MaterialUniforms(ctx, initialState)} = initialState
    const {context = new MaterialContext(ctx, initialState)} = initialState
    const {state = new MaterialState(ctx, initialState)} = initialState

    const injectContext = ctx.regl({ ...state, uniforms, context })

    const injectMapContext = ctx.regl({
      context: {
        mapTexure: ({texture}) => texture,
        mapTextureResolution: ({textureResolution}) => textureResolution,
      }
    })

    const injectEnvmapContext = ctx.regl({
      context: {
        envmapTexture: ({texture}) => texture,
        envmapTextureResolution: ({textureResolution}) => textureResolution,
      }
    })

    function update(state, block) {
      if ('function' == typeof state) {
        block = state
        state = {}
      }

      if (isArrayLike(state)) {
        state = [ ...state ]
      } else {
        state = { ...(state || {}) }
      }

      block = block || function() {}

      const mapState = isArrayLike(state) ? {} : state
      const envmap = isArrayLike(state) ? initialState.envmap : coalesce(state.envmap, initialState.envmap)
      const map = isArrayLike(state) ? initialState.map : coalesce(state.map, initialState.map)

      injectEnvmap(() => {
        injectMap(() => {
          injectContext(state, block)
        })
      })

      function injectEnvmap(next) {
        if ('function' != typeof envmap) { next() }
        else { envmap(() => { injectEnvmapContext(next) }) }
      }

      function injectMap(next) {
        if ('function' != typeof map) { next() }
        else { map(() => { injectMapContext(next) }) }
      }

      return this
    }
  }
}

export class MaterialState {
  constructor(ctx, initialState = {}) {
    if (initialState.blending) {
      initialState.blend = initialState.blending
      delete initialState.blending
    }

    if (initialState.culling) {
      initialState.cull = initialState.culling
      delete initialState.culling
    }

    if (null == initialState.blend) {
      initialState.blend = {}
    }

    if (null == initialState.cull) {
      initialState.cull = {}
    }

    if (null == initialState.depth) {
      initialState.depth = {}
    }

    let {fragmentShader = kDefaultMaterialFragmentShader} = initialState
    let {fragmentShaderMain} = initialState

    const {type = types.MaterialType} = initialState
    const typeName = Material.typeName(type)

    const shaderDefines = {
      MATERIAL_TYPE: typeName,
      ...initialState.shaderDefines
    }

    if ('string' == typeof fragmentShaderMain) {
      shaderDefines['SHADER_MAIN_BODY'] = 1
      fragmentShader = fragmentShader
        .replace('SHADER_MAIN_BODY_SOURCE', fragmentShaderMain)
    } else {
      shaderDefines[`use${typeName}`] = 1 // `useLambertMaterial', etc
    }

    if (null != initialState.map) {
      if ('cubetexture' === typeOf(initialState.map)) {
        shaderDefines.HAS_CUBE_MAP = 1
      } else {
        shaderDefines.HAS_MAP = 1
      }
    }

    if (null != initialState.envmap) {
      if ('cubetexture' === typeOf(initialState.envmap)) {
        shaderDefines.HAS_ENVIRONMENT_CUBE_MAP = 1
      } else {
        shaderDefines.HAS_ENVIRONMENT_MAP = 1
      }
    }

    for (let key in types) {
      shaderDefines[`${key}`] = types[key]
    }

    //shaderDefines['MAX_SPOT_LIGHTS'] = kMaxSpotLights
    shaderDefines['MAX_POINT_LIGHTS'] = kMaxPointLights
    shaderDefines['MAX_AMBIENT_LIGHTS'] = kMaxAmbientLights
    shaderDefines['MAX_DIRECTIONAL_LIGHTS'] = kMaxDirectionalLights

    for (let key in shaderDefines) {
      fragmentShader = `#define ${key} ${shaderDefines[key]}\n`+fragmentShader
    }

    this.frag = fragmentShader
    this.blend = {
      equation: () => coalesce(
        initialState.blend.equation,
        kDefaultMaterialBlendingState.equation
      ),

      color: () => ensureRGBA(coalesce(
        initialState.blend.color,
        kDefaultMaterialBlendingState.color
      )),

      enable({}, {
        blend = undefined,
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(initialState.transparent, false),
        blending = coalesce(
          blend,
          initialState.blend.enable,
          kDefaultMaterialBlendingState.enable
        ),
      } = {}) {
        if (opacity < 1.0 || transparent) {
          return true
        } else if ('boolean' == typeof blending) {
          return blending
        } else {
          return transparent
        }
      },

      func({}, {
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(initialState.transparent, false),
      } = {}) {
        if (opacity < 1.0 || transparent) {
          return {src: 'src alpha', dst: 'one'}
        } else {
          return coalesce(
            initialState.blend.func,
            kDefaultMaterialBlendingState.func)
        }
      },
    }

    this.cull = {
      enable: ({}, {cull} = {}) => Boolean(coalesce(
        cull,
        initialState.cull.enable,
        kDefaultMaterialCullingState.enable
      )),

      face: ({}, {cullFace}) => coalesce(
        cullFace,
        initialState.cull.face,
        kDefaultMaterialCullingState.face
      ),
    }

    this.depth = {
      enable: () => coalesce(
        initialState.depth.enable,
        kDefaultMaterialDepthState.enable
      ),

      range: () => coalesce(
        initialState.depth.range,
        kDefaultMaterialDepthState.range
      ),

      func: () => coalesce(
        initialState.depth.func,
        kDefaultMaterialDepthState.func
      ),

      mask({}, {
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(
          initialState.transparent,
          initialState.blend.enable,
          kDefaultMaterialDepthState.enable,
          false),
      } = {}) {
        if (opacity < 1.0 || transparent) {
          return true
        } else {
          return coalesce(initialState.depth.mask, kDefaultMaterialDepthState.mask)
        }
      }
    }
  }
}

export class MaterialContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    super(ctx)
    const { type = types.MaterialType, } = initialState
    this.type = () => coalesce(type, types.MaterialType)
    this.color = ({}, {color} = {}) => ensureRGBA(new Color(coalesce(
      color,
      initialState.color,
      kDefaultMaterialColor
    )))
    this.opacity = ({}, {opacity} = {}) => coalesce(
      opacity,
      initialState.opacity,
      kDefaultMaterialOpacity
    )
  }
}

export class MaterialUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx)
    const emptyTexture =
         ctx.get('emptyTexture')
      || ctx.set('emptyTexture', ctx.regl.texture())
    const emptyCubeTexture =
         ctx.get('emptyCubeTexture')
      || ctx.set('emptyCubeTexture', ctx.regl.cube())

    let hasMap = false
    let hasEnvMap = false

    if (null != initialState.map) {
      if (['cubetexture', 'texture'].indexOf(typeOf(initialState.map)) > -1) {
        hasMap = true
      }
    }

    if (null != initialState.envmap) {
      if (['cubetexture', 'texture'].indexOf(typeOf(initialState.envmap)) > -1) {
        hasEnvMap = true
      }
    }

    // material uniform properties
    this.set({
      'material.opacity': ({opacity}) => coalesce(
        opacity,
        initialState.opacity,
        kDefaultMaterialOpacity
      ),

      'material.color': ({color}) => coalesce(
        color,
        initialState.color,
        kDefaultMaterialColor
      ),

      'material.type': ({type}) => coalesce(
        type,
        initialState.type,
        kDefaultMaterialType
      )
    })

    // texture map uniform properties
    if (hasMap) {
      this.set({
        'map.resolution': ({textureResolution, mapTextureResolution}) => {
          return coalesce(mapTextureResolution, textureResolution, [0, 0])
        },

        'map.data': ({texture, mapTexture = texture}) => {
          let placeholder ='texture' == typeOf(mapTexture)
            ? emptyTexture
            : emptyCubeTexture
          return null == initialState.map
            ? placeholder
            : coalesce(mapTexture, placeholder)
        },
      })
    }

    // texture environment map uniform properties
    if (hasEnvMap) {
      this.set({
        'envmap.resolution': ({textureResolution, envmapTextureResolution}) => {
          return coalesce(envmapTextureResolution, textureResolution, [0, 0])
        },

        'envmap.data': ({texture, envmapTexture = texture}) => {
          let placeholder ='texture' == typeOf(envmapTexture)
            ? emptyTexture
            : emptyCubeTexture
          return null == initialState.envmap
            ? placeholder
            : coalesce(envmapTexture, placeholder)
        },
      })
    }
  }
}
