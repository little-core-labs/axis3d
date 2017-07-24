'use strict'

import { ShaderUniforms, DynamicValue } from './gl'
import { Command } from './command'
import { Entity } from './entity'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

let MATERIAL_COMMAND_NEXT_ID = 0x6d

export const kDefaultMaterialXColor = [100/255, 110/255, 255/255, 1]
export const kDefaultMaterialXOpacity = 1

export const kDefaultMaterialXFragmentShader =
  glslify(__dirname + '/../glsl/material/fragments/main.glsl', {
    transform: ['glslify-fancy-imports']
  })

export const kDefaultMaterialXBlendingState = {
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: { src: 'src alpha', dst: 'one minus src alpha' },
}

export const kDefaultMaterialXCullingState = {
  enable: false,
  face: 'back',
}

export const kDefaultMaterialXDepthState = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true,
}

export class MaterialX extends Entity {
  constructor(ctx, initialState = {}) {
    const {uniforms = new MaterialXUniforms(ctx, initialState)} = initialState
    const {context = new MaterialXContext(ctx, initialState)} = initialState
    const {state = new MaterialXState(ctx, initialState)} = initialState
    const injectContext = ctx.regl({ ...state, uniforms, context })
    super(injectContext)
  }
}

export class MaterialXState {
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

    let {fragmentShader = kDefaultMaterialXFragmentShader} = initialState

    const shaderDefines = { ...initialState.shaderDefines }

    for (let key in shaderDefines) {
      fragmentShader = `#define ${key} ${shaderDefines[key]}\n`+fragmentShader
    }

    this.frag = fragmentShader
    this.blend = {
      equation: () => coalesce(
        initialState.blend.equation,
        kDefaultMaterialXBlendingState.equation
      ),

      color: () => ensureRGBA(coalesce(
        initialState.blend.color,
        kDefaultMaterialXBlendingState.color
      )),

      enable({}, {
        blend = undefined,
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(initialState.transparent, false),
        blending = coalesce(
          blend,
          initialState.blend.enable,
          kDefaultMaterialXBlendingState.enable
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
            kDefaultMaterialXBlendingState.func)
        }
      },
    }

    this.cull = {
      enable: ({}, {cull} = {}) => Boolean(coalesce(
        cull,
        initialState.cull.enable,
        kDefaultMaterialXCullingState.enable
      )),

      face: ({}, {cullFace}) => coalesce(
        cullFace,
        initialState.cull.face,
        kDefaultMaterialXCullingState.face
      ),
    }

    this.depth = {
      enable: () => coalesce(
        initialState.depth.enable,
        kDefaultMaterialXDepthState.enable
      ),

      range: () => coalesce(
        initialState.depth.range,
        kDefaultMaterialXDepthState.range
      ),

      func: () => coalesce(
        initialState.depth.func,
        kDefaultMaterialXDepthState.func
      ),

      mask({}, {
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(
          initialState.transparent,
          initialState.blend.enable,
          kDefaultMaterialXDepthState.enable,
          false),
      } = {}) {
        if (opacity < 1.0 || transparent) {
          return true
        } else {
          return coalesce(initialState.depth.mask, kDefaultMaterialXDepthState.mask)
        }
      }
    }
  }
}

export class MaterialXContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.color = ({}, {color} = {}) => ensureRGBA(coalesce(
      color,
      initialState.color,
      kDefaultMaterialXColor
    ))
    this.opacity = ({}, {opacity} = {}) => coalesce(
      opacity,
      initialState.opacity,
      kDefaultMaterialXOpacity
    )
  }
}

export class MaterialXUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.set({
      'material.opacity': ({opacity}) => coalesce(
        opacity,
        initialState.opacity,
        kDefaultMaterialXOpacity
      ),

      'material.color': ({color}) => coalesce(
        color,
        initialState.color,
        kDefaultMaterialXColor
      )
    })
  }
}
