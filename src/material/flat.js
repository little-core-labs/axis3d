'use strict'

import {
  MaterialCommand
} from './material'

import {
  FlatMaterial as type
} from './types'

module.exports = exports = (...args) => new FlatMaterialCommand(...args)
export class FlatMaterialCommand extends MaterialCommand {
  constructor(ctx, initialState = {}) {
    super(ctx, { ...initialState, type })
  }
}
