'use strict'

import { ShaderUniforms, DynamicValue } from './gl'
import { ensureRGBA, isArrayLike, get } from '../utils'
import { Command } from './command'
import { Shader } from './shader'
import { Entity } from './entity'

import injectDefines from 'glsl-inject-defines'
import coalesce from 'defined'
import glslify from 'glslify'
import vec4 from 'gl-vec4'

let MATERIAL_COMMAND_NEXT_ID = 0x6d

export const kDefaultMaterialColor = [100/255, 110/255, 255/255]
export const kDefaultMaterialOpacity = 1
export const kDefaultMaterialUniformName = 'material'

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

export class Material extends Entity {
  static defaults() {
    return {
      ...super.defaults(),
      uniformName: 'material',
      opacity: 1,
      color:  [100/255, 110/255, 255/255],
    }
  }

  constructor(ctx, initialState = {}) {
    const {uniforms = new MaterialUniforms(ctx, initialState)} = initialState
    const {context = new MaterialContext(ctx, initialState)} = initialState
    const {shader = new MaterialShader(ctx, initialState)} = initialState
    const {state = new MaterialState(ctx, initialState)} = initialState
    const injectContext = ctx.regl({ ...state, uniforms, context })
    super(ctx, (state, block) => {
      shader(state, () => {
        injectContext(state, block)
      })
    })
  }
}

export class MaterialShader extends Shader {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMaterialUniformName} = initialState
    const {fragmentShader = null} = initialState
    super(ctx, {
      fragmentShader: ({fragmentShader, texture}) => {
        if (fragmentShader) { return fragmentShader }
        return `
        #define GLSL_MATERIAL_UNIFORM_VARIABLE ${uniformName}
        #include <material/material>
        #include <material/uniforms>
        #include <texture/2d>
        #include <texture/cube>
        #include <varying/uv>
        #include <varying/read>
        #include <varying/data>
        #include <mesh/fragment>
        #if ${texture ? 1 : 0} > 0
        uniform Texture2D texture2d;
        void main() {
          VaryingData data = ReadVaryingData();
          gl_FragColor = texture2D(texture2d.data, data.uv);
        }
        #else
        void main() {
          gl_FragColor = MeshFragment(
            ${uniformName}.color,
            ${uniformName}.opacity);
        }
        #endif
        `
      },
      ...initialState
    })
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

    if (null == initialState.blend) { initialState.blend = {} }
    if (null == initialState.cull) { initialState.cull = {} }
    if (null == initialState.depth) { initialState.depth = {} }

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
          return coalesce(
            initialState.depth.mask,
            kDefaultMaterialDepthState.mask)
        }
      }
    }
  }
}

export class MaterialContext extends DynamicValue {
  constructor(ctx, initialState = {}) {
    super(ctx)
    this.set({
      color: this.argument('color', null, coalesce(
        initialState.color,
        kDefaultMaterialColor
      )),
      opacity: this.argument('opacity', null, coalesce(
        initialState.opacity,
        kDefaultMaterialOpacity
      ))
    })
  }
}

export class MaterialUniforms extends ShaderUniforms {
  constructor(ctx, initialState = {}) {
    const {uniformName = kDefaultMaterialUniformName} = initialState
    super(ctx)
    this.set({
      [`${uniformName}.opacity`]: ({opacity}) => coalesce(
        opacity,
        initialState.opacity,
        kDefaultMaterialOpacity
      ),

      [`${uniformName}.color`]: ({color}) => ensureRGBA(coalesce(
        color,
        initialState.color,
        kDefaultMaterialColor
      )).slice(0, 3),
    })
  }
}
