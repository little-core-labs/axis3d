'use strict'

/**
 * Module dependencies.
 */

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

/**
 * Next available Material ID represented
 * as an integer.
 * @private
 */

let MATERIAL_COMMAND_NEXT_ID = 0x6d

/**
 * The default material fragment shader.
 *
 * @public
 * @const
 * @type {String}
 * @see {@link https://www.npmjs.com/package/glslify}
 * @see {@link http://stack.gl}
 */

export const kDefaultMaterialFragmentShader =
  glslify(__dirname + '/../glsl/material/fragments/main.glsl', {
    transform: ['glslify-fancy-imports']
  })

/**
 * The default material opacity value.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultMaterialOpacity = 1

/**
 * The default material color.
 *
 * @public
 * @const
 * @type {Color}
 */

export const kDefaultMaterialColor = new Color(
  100/255, 110/255, 255/255
)

/**
 * The default material type.
 *
 * @public
 * @const
 * @type {MaterialType}
 */

export const kDefaultMaterialType = types.MaterialType

/**
 * The default WebGL blending state for a material.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#blending}
 */

export const kDefaultMaterialBlendingState = {
  equation: 'add',
  enable: true,
  color: [0, 0, 0, 1],
  func: {
    src: 'src alpha',
    dst: 'one minus src alpha'
  },
}

/**
 * The default WebGL culling state for a material.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#culling}
 */

export const kDefaultMaterialCullingState = {
  enable: true,
  face: 'back',
}

/**
 * The default WebGL depth buffer state for a material.
 *
 * @public
 * @const
 * @type {Object}
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer}
 */

export const kDefaultMaterialDepthState = {
  enable: true,
  range: [0, 1],
  func: 'less',
  mask: true,
}

/**
 * The Material class represents the base type for
 * all materials.
 *
 * @public
 * @abstract
 * @class Material
 * @extends Command
 */

export class Material extends Command {

  /**
   * Returns the next material ID
   *
   * @public
   * @method
   * @static
   * @return {Number}
   */

  static id() {
    return MATERIAL_COMMAND_NEXT_ID ++
  }

  /**
   * Returns a string representation of a material type
   * from a given type identifier.
   *
   * @public
   * @static
   * @method
   * @param {MaterialType|Number} type
   * @return {String}
   */

  static typeName(type) {
    return coalesce(
      Object.keys(types).find((k) => type == types[k]),
      type,
      'Material')
      .replace(/Type$/, '')
  }

  /**
   * Material class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(update)
    incrementStat('Material')
    assignTypeName(this, 'material')

    this.typeName = 'material'

    /**
     * Material map.
     */

    const {materialMap = new MaterialMap(ctx, initialState)} = initialState

    /**
     * Material cubemap.
     */

    const {materialCubeMap = new MaterialCubeMap(ctx, initialState)} = initialState

    /**
     * Injected material uniforms.
     */

    const {uniforms = new MaterialUniforms(ctx, initialState)} = initialState

    /**
     * Injected material context.
     */

    const {context = new MaterialContext(ctx, initialState)} = initialState

    /**
     * Material state.
     */

    const {state = new MaterialState(ctx, initialState)} = initialState

    /**
     * Regl context injection function.
     */

    const injectContext = ctx.regl({
      ...state,
      uniforms,
      context,
    })

    /**
     * Material update function.
     */

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

      const mapState = isArrayLike(state) ? {} : (state.map || state.cubemap)
      materialMap.injectContext(mapState || {}, ({map, cubemap} = {}) => {
        if ('function' == typeof cubemap) {
          cubemap((c) => {
            injectContext(state, block)
          })
        }
        if ('function' == typeof map) {
          map((c) => {
            injectContext(state, block)
          })
        }
      })

      return this
    }
  }
}

/**
 * MaterialState class.
 *
 * @public
 * @class MaterialState
 */

export class MaterialState {

  /**
   * MaterialState class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

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

    /**
     * Material fragment shader source.
     */

    let {fragmentShader = kDefaultMaterialFragmentShader} = initialState

    /**
     * Material fragment shader source.
     */

    let {fragmentShaderMain} = initialState

    /**
     * Material type.
     */

    const {type = types.MaterialType} = initialState

    /**
     * Material type string.
     */

    const typeName = Material.typeName(type)

    /**
     * Injected fragment shader defines.
     */

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

    if (null != initialState.envmap) {
      shaderDefines.HAS_REFLECTION = 1
      if ('cubetexture' === initialState.envmap.typeName) {
        shaderDefines.HAS_CUBE_MAP = 1
      } else {
        shaderDefines.HAS_MAP = 1
      }
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
        shaderDefines.HAS_ENV_CUBE_MAP = 1
      } else {
        shaderDefines.HAS_ENV_MAP = 1
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

    /**
     * Material fragment shader source string.
     *
     * @public
     * @type {String}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#shaders}
     */

    this.frag = fragmentShader

    /**
     * Blending state for a material.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultMaterialBlendingState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#blending}
     */

    this.blend = {

      /**
       * Blending equation.
       *
       * @public
       * @property
       * @type {String}
       * @name blend.equation
       */

      equation() {
        return coalesce(
          initialState.blend.equation,
          kDefaultMaterialBlendingState.equation)
      },

      /**
       * Indicates if blending is enabled.
       *
       * @public
       * @property
       * @type {Boolean}
       * @name blend.enabled
       */

      enable({}, {
        blend = undefined,
        opacity = coalesce(initialState.opacity, 1),
        transparent = coalesce(initialState.transparent, false),

        blending = coalesce(
          blend,
          initialState.blend.enable,
          kDefaultMaterialBlendingState.enable),
      } = {}) {
        if (opacity < 1.0 || transparent) {
          return true
        } else if ('boolean' == typeof blending) {
          return blending
        } else {
          return transparent
        }
      },

      /**
       * Blending color
       *
       * @public
       * @property
       * @type {Array<Number>|Color|Vector4}
       * @name blend.color
       */

      color() {
       return ensureRGBA(coalesce(
          initialState.blend.color,
          kDefaultMaterialBlendingState.color))
      },

      /**
       * Blending function
       *
       * @public
       * @property
       * @type {Object}
       * @name blend.func
       */

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

    /**
     * Culling state for a material.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultMaterialCullingState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#culling}
     */

    this.cull = {
      enable({}, {cull = initialState.cull.enable} = {}) {
        return Boolean(coalesce(cull, kDefaultMaterialCullingState.enable))
      },

      face({}, {cullFace = initialState.cull.face}) {
        return coalesce(cullFace, kDefaultMaterialCullingState.face)
      },
    }

    /**
     * Depth buffer state for a material.
     *
     * @public
     * @type {Object}
     * @see {@link kDefaultMaterialDepthState}
     * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer}
     */

    this.depth = {
      enable() {
        return coalesce(initialState.depth.enable, kDefaultMaterialDepthState.enable)
      },

      range() {
        return coalesce(initialState.depth.range, kDefaultMaterialDepthState.range)
      },

      func() {
        return coalesce(initialState.depth.func, kDefaultMaterialDepthState.func)
      },

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

/**
 * MaterialContext class.
 *
 * @public
 * @class MaterialContext
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#context}
 */

export class MaterialContext {

  /**
   * MaterialContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState = {}) {
    const {
      type = types.MaterialType,
      id = Material.id(),
    } = initialState

    /**
     * Material opacity.
     *
     * @public
     * @type {Number}
     */

    this.opacity = ({}, {opacity = initialState.opacity} = {}) => {
      return coalesce(opacity, kDefaultMaterialOpacity)
    }

    /**
     * Material type.
     *
     * @public
     * @type {Number}
     */

    this.type = () => {
      return coalesce(type, types.MaterialType)
    }

    /**
     * Material color value.
     *
     * @public
     * @type {Color|Vector4|Array}
     * @name material.color
     */

    this.color = ({}, {color = initialState.color} = {}) => {
      return ensureRGBA(coalesce(color, kDefaultMaterialColor))
    }
  }
}

/**
 * The MaterialUniforms class represents an object of
 * all injected uniforms for a material.
 *
 * @public
 * @class MaterialUniforms
 */

export class MaterialUniforms {

  /**
   * MaterialUniforms class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    const emptyTexture = ctx.regl.texture()
    const emptyCubeTexture = ctx.regl.cube()

    /**
     * Material opacity value.
     *
     * @public
     * @type {Number}
     * @name material.opacity
     */

    this['material.opacity'] = ({opacity = initialState.opacity}) => {
      return coalesce(opacity, kDefaultMaterialOpacity)
    }

    /**
     * Material color value.
     *
     * @public
     * @type {Color|Vector4|Array}
     * @name material.color
     */

    this['material.color'] = ({color = initialState.color}) => {
      return coalesce(color, kDefaultMaterialColor)
    }

    /**
     * Material type identifier.
     *
     * @public
     * @type {Number}
     * @name material.type
     * @see {@link material/types}
     */

    this['material.type'] = ({type = initialState.type}) => {
      return coalesce(type, kDefaultMaterialType)
    }

    /**
     * Texture map resolution if available.
     *
     * @public
     * @type {Array<Number>|Vector2}
     */

    this['map.resolution'] = ({textureResolution}) => {
      return coalesce(textureResolution, [0, 0])
    }

    /**
     * Texture map data if available.
     *
     * @public
     * @type {Texture}
     */

    this['map.data'] = ({texture, textureData}) => {
      return coalesce(texture, emptyTexture)
    }

    /**
     * Texture envmap resolution if available.
     *
     * @public
     * @type {Array<Number>|Vector2}
     */

    this['envmap.resolution'] = ({textureResolution}) => {
      return coalesce(textureResolution, [0, 0])
    }

    /**
     * Texture envmap data if available.
     *
     * @public
     * @type {Texture}
     */

    this['envmap.data'] = ({texture, textureData}) => {
      return coalesce(texture, emptyTexture)
    }

    /**
     * Texture cubemap data if available.
     *
     * @public
     * @type {Texture}
     */

    this['cubemap.resolution'] = ({textureResolution}) => {
      return coalesce(textureResolution, [0, 0])
    }

    /**
     * Texture cubemap data if available.
     *
     * @public
     * @type {Texture}
     */

    this['cubemap.data'] = ({texture, textureData}) => {
      return coalesce(texture, emptyCubeTexture)
    }

    /**
     * Texture envcubemap data if available.
     *
     * @public
     * @type {Texture}
     */

    this['envcubemap.resolution'] = ({textureResolution}) => {
      return coalesce(textureResolution, [0, 0])
    }

    /**
     * Texture envcubemap data if available.
     *
     * @public
     * @type {Texture}
     */

    this['envcubemap.data'] = ({texture, textureData}) => {
      return coalesce(texture, emptyCubeTexture)
    }
  }
}

/**
 * The MaterialMap class represents an abstraction around a texture map
 * given to a material.
 *
 * @public
 * @class MaterialMap
 */

export class MaterialMap {

  /**
   * MaterialMap class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Injects a map into a context for a material.
     *
     * @public
     * @type {Function}
     */

    this.injectContext = ctx.regl({
      context: {
        map: ({}, {map = initialState.map || initialState.envmap}) => {
          return map
        },
        cubemap: ({}, {cubemap = initialState.envmap || initialState.map}) => {
          return cubemap
        },
      }
    })
  }
}

/**
 * The MaterialCubeMap class represents an abstraction around
 * a cubemap given to a material.
 *
 * @public
 * @class MaterialCubeMap
 */

export class MaterialCubeMap {

  /**
   * MaterialCubeMap class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {

    /**
     * Injects a cubemap into a context for a material.
     *
     * @public
     * @type {Function}
     */

    this.injectContext = ctx.regl({
      context: {
        cubemap: ({}, {cubemap = initialState.envmap}) => {
          return cubemap
        }
      }
    })
  }
}
