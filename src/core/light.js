'use strict'

/**
 * Module dependencies.
 */

import { Object3DContext, Object3D, } from './object3d'
import { Quaternion, Vector3 } from '../math'
import { assignTypeName } from './types'
import { incrementStat } from '../stats'
import * as types from '../light/types'
import { Color } from './color'
import { Mesh } from './mesh'

import {
  DirectionalLightType,
  PointLightType,
  BasicLightType,
} from '../light/types'

import coalesce from 'defined'
import vec3 from 'gl-vec3'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

let LIGHT_COMMAND_NEXT_ID = 0

export const kDefaultLightIntensity = 10
export const kDefaultLightPosition = new Vector3(0, 0, 0)
export const kDefaultLightRotation = new Quaternion()
export const kDefaultLightAmbient = 0.1
export const kDefaultLightRadius = 50
export const kDefaultLightColor = new Color('white')
export const kDefaultLighType = BasicLightType

/**
 * The Light class represents the base type for all lights.
 *
 * @public
 * @class Light
 * @extends Object3D
 * @see {@link Object3D}
 */
export class Light extends Object3D {

  /**
   * Light class constructor.
   *
   * @public
   * @constructor
   * @param {Context} ctx Axis3D render context.
   * @param {?Object} initialState Initial state
   */
  constructor(ctx, initialState = {}) {
    // init update method
    const {regl} = ctx
    const {
      intensity: initialIntensity = kDefaultLightIntensity,
      position: initialPosition = kDefaultLightPosition,
      rotation: initialRotation = kDefaultLightRotation,
      ambient: initialAmbient = kDefaultLightAmbient,
      visible: initialVisible = true,
      radius: initialRadius = kDefaultLightRadius,
      color: initialColor = kDefaultLightColor,
      type: initialType = kDefaultLighType,
      id = Light.id(),
    } = initialState

    const {context = new LightContext()} = initialState
    const injectContext = regl({ context })
    const updateLight = initialState.update || (({} = {}, f) => f())

    super(ctx, { ...initialState, update })

    incrementStat('Light')
    assignTypeName(this, 'light')

    function update({
      transform: contextTransform = kMat4Identity,
      position: contextPosition = initialPosition,
      lights: contextLights,
    }, {
      intensity = initialIntensity,
      rotation = initialRotation,
      ambient = initialAmbient,
      visible = initialVisible,
      radius = initialRadius,
      color = initialColor,
      type = initialType,

      transform = contextTransform,
      position = contextPosition,
      lights = contextLights,
    }, block) {
      const light = {}
      let w = 0
      switch (type || initialType) {
        case DirectionalLightType: w = 1; break
        case PointLightType: w = 0; break
      }
      Object.assign(light, {
        typeName: Light.typeName(type),
        intensity: coalesce(intensity, initialIntensity),
        position: [...coalesce(position, initialPosition), w],
        ambient: coalesce(ambient, initialAmbient),
        visible: coalesce(visible, initialVisible),
        radius: coalesce(radius, initialRadius),
        color: coalesce(color, [...initialColor]),
        type: coalesce(type, initialType),
      })

      // transform light position
      vec3.transformMat4(light.position, light.position, transform)
      // push to scoped lights in frame context
      lights.push(light)
      injectContext(arguments[1] || {}, ({}, args) => {
        updateLight(args || {}, (...args) => {
          block(...args)
        })
      })
    }
  }

  /**
   * Returns the next light ID
   *
   * @public
   * @method
   * @static
   * @return {Number}
   */
  static id() {
    return LIGHT_COMMAND_NEXT_ID ++
  }

  /**
   * Returns a string representation of a light type
   * from a given type identifier.
   *
   * @public
   * @static
   * @method
   * @param {LightType|Number} type
   * @return {String}
   */
  static typeName(type) {
    return coalesce(Object.keys(types).find((k) => type == types[k]), type)
  }
}

/**
 * LightContext class.
 *
 * @public
 * @class CameraContext
 * @see {@link https://github.com/regl-project/regl/blob/gh-pages/API.md#context}
 */
export class LightContext extends Object3DContext {

  /**
   * LightContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState) {
    super(ctx, initialState)
  }
}
