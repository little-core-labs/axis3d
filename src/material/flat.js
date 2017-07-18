'use strict'

import { FlatMaterialType as type } from './types'
import { Material } from '../core/material'

export class FlatMaterial extends Material {
  constructor(ctx, initialState = {}) {
    super(ctx, { type, ...initialState })
  }
}
