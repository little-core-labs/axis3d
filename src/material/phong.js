'use strict'

import { LambertMaterial, LambertMaterialUniforms } from './lambert'
import { PhongMaterialType as type } from './types'
import { Color } from '../core/color'
import coalesce from 'defined'

export const kDefaultPhongMaterialSpecularColor = new Color(0x111111)
export const kDefaultPhongMaterialShininess = 40

export class PhongMaterial extends LambertMaterial {
  constructor(ctx, initialState = {}) {
    const {
      uniforms = new PhongMaterialUniforms(ctx, initialState)
    } = initialState
    super(ctx, { type, ...initialState, uniforms })
  }
}

export class PhongMaterialUniforms extends LambertMaterialUniforms {
  constructor(ctx, initialState = {}) {
    super(ctx, initialState)
    this.set({
      'material.shininess': this.argument('shininess', null, coalesce(
        initialState.shininess,
        kDefaultPhongMaterialShininess
      )),
      'material.specular': this.argument('specular', null, coalesce(
        initialState.specular,
        kDefaultPhongMaterialSpecularColor
      )),
    })
  }
}
