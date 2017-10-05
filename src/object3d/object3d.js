import { Object3DContext } from './context'
import { assignDefaults } from '../utils'
import { Entity } from '../core'
import * as defaults from './defaults'

export function Object3D(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Object3DContext(ctx, initialState)
}

