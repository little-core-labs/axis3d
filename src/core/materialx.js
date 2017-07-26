'use strict'

import { ShaderUniforms, DynamicValue } from './gl'
import { ensureRGBA, isArrayLike } from '../utils'
import { Command } from './command'
import { Shader } from './shader'
import { Entity } from './entity'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

let MATERIAL_COMMAND_NEXT_ID = 0x6d

export const kDefaultMaterialXColor = [100/255, 110/255, 255/255]
export const kDefaultMaterialXOpacity = 1
export const kDefaultMaterialUniformName = 'material'

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
    const {shader = new MaterialXShader(ctx, initialState)} = initialState
    const {state = new MaterialXState(ctx, initialState)} = initialState
    const injectContext = ctx.regl({ ...state, uniforms, context })
    super(ctx, (state, block) => {
      shader(state, () => {
        injectContext(state, block)
      })
    })
  }
}

export class MaterialXShader extends Shader {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMaterialUniformName} = initialState
    const {fragmentShader = null} = initialState
    super(ctx, {
      fragmentShader: `
      #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
      #include <mesh/fragment>
      #include <material/material>
      #include <material/uniforms>
      void main() {
        gl_FragColor = MeshFragment(
          ${uniformName}.color,
          ${uniformName}.opacity);
      }
      `,
      ...initialState
    })
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

    if (null == initialState.blend) { initialState.blend = {} }
    if (null == initialState.cull) { initialState.cull = {} }
    if (null == initialState.depth) { initialState.depth = {} }

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
          return coalesce(
            initialState.depth.mask,
            kDefaultMaterialXDepthState.mask)
        }
      }
    }
  }
}

export class MaterialXContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.set({
      color: this.argument('color', null, coalesce(
        initialState.color,
        kDefaultMaterialXColor
      )),
      opacity: this.argument('opacity', null, coalesce(
        initialState.opacity,
        kDefaultMaterialXOpacity
      ))
    })
  }
}

export class MaterialXUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMaterialUniformName} = initialState
    super(ctx)
    this.set({
      [`${uniformName}.opacity`]: ({opacity}) => coalesce(
        opacity,
        initialState.opacity,
        kDefaultMaterialXOpacity
      ),

      [`${uniformName}.color`]: ({color}) => ensureRGBA(coalesce(
        color,
        initialState.color,
        kDefaultMaterialXColor
      )).slice(0, 3)
    })
  }
}
