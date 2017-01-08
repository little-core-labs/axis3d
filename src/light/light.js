'use strict'

import * as types from './types'
import coalesce from 'defined'

import {
  incrementStat
} from '../stats'

import {
  Object3DCommand
} from '../object3d'

import {
  MeshCommand
} from '../mesh'

import {
  FlatMaterialCommand
} from '../material/flat'

let LIGHT_COMMAND_COUNTER = 0

module.exports = exports = (...args) => new LightCommand(...args)
export class LightCommand extends Object3DCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('Light')

    const {regl} = ctx
    const id = LIGHT_COMMAND_COUNTER ++

    const {
      intensity: initialIntensity = 10,
      position: initialPosition = [0, 0, 0],
      ambient: initialAmbient = 0.1,
      visible: initialVisible = true,
      radius: initialRadius = 50,
      color: initialColor = [1, 1, 1, 1],
      type: initialType = types[0],
    } = initialState

    const context = {}
    const material = new FlatMaterialCommand(ctx)
    const injectContext = regl({ context })

    super(ctx, {
      ...initialState,
      transform: false,
      update(state, block) {
        const noop = () => void 0

        if ('function' == typeof state) {
          block = state
          state = {}
        }

        const {position} = ctx.reglContext
        const {
          intensity = initialIntensity,
          ambient = initialAmbient,
          visible = initialVisible,
          radius = initialRadius,
          color = initialColor,
          type = initialType,
        } = state

        const typeName =
          Object.keys(types).find((k) => (type || initialType) == types[k])

        let w = 0
        if ((type || initialType) == types.DirectionalLight) {
          w = 1
        } else if ((type || initialType) == types.PointLight) {
          w = 0
        }

        const light = {}
        light.intensity = coalesce(intensity, initialIntensity)
        light.position = coalesce([...(position || initialPosition), w])
        light.ambient = coalesce(ambient, initialAmbient)
        light.visible = coalesce(visible, initialVisible)
        light.radius = coalesce(radius, initialRadius)
        light.color = coalesce(color, initialColor)
        light.type = coalesce(type, initialType)
        light.typeName

        state = state || {}
        block = block || noop

        // push to scoped lights in context
        ctx.reglContext.lights.push(light)

        const update = initialState.update || (({} = {}, f) => f())

        material(state, ({}, args = {}) => {
          injectContext(args, ({}, args = {}) => {
            update(args, (...args) => {
              block(...args)
            })
          })
        })
      }
    })
  }
}
