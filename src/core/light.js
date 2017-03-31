'use strict'

/**
 * Module dependencies.
 */

import { Quaternion, Vector3 } from '../math'
import { incrementStat } from '../stats'
import { FlatMaterial } from '../material/flat'
import * as types from '../light/types'
import { Color } from './color'
import { Mesh } from './mesh'

import {
  Object3DContext,
  Object3D,
} from './object3d'

import {
  DirectionalLightType,
  PointLightType,
  BasicLightType,
} from '../light/types'

import coalesce from 'defined'
import vec3 from 'gl-vec3'
import mat4 from 'gl-mat4'

const kMat4Identity = mat4.identity([])

/**
 * Next available Light ID represented
 * as an integer.
 *
 * @private
 */

let LIGHT_COMMAND_NEXT_ID = 0

/**
 * Default light intensity, if applicable.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultLightIntensity = 10


/**
 * Default light position, if applicable.
 *
 * @public
 * @const
 * @type {Vector3}
 */

export const kDefaultLightPosition = new Vector3(0, 0, 0)

/**
 * Default light rotation, if applicable.
 *
 * @public
 * @const
 * @type {Quaternion}
 */

export const kDefaultLightRotation = new Quaternion()

/**
 * Default light ambient, if applicable.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultLightAmbient = 0.1

/**
 * Default light radius, if applicable.
 *
 * @public
 * @const
 * @type {Number}
 */

export const kDefaultLightRadius = 50

/**
 * Default light color, if applicable.
 *
 * @public
 * @const
 * @type {Color}
 */

export const kDefaultLightColor = new Color('white')

/**
 * Default light type, if applicable.
 *
 * @public
 * @const
 * @type {LightType}
 */

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
    incrementStat('Light')

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

    const updateLight = initialState.update || (({} = {}, f) => f())

    const {context = new LightContext()} = initialState
    const material = new FlatMaterial(ctx)
    const injectContext = regl({ context })

    super(ctx, {
      ...initialState,

      // all Object3D descendants must implement an update
      // method to actually do something
      update
    })

    /**
     * Calls current target render function
     */

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
        material(args || {}, ({}, args) => {
          updateLight(args || {}, (...args) => {
            block(...args)
          })
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
