'use strict'

/**
 * Module dependencies.
 */

import { Matrix } from '../core/matrix'

export class Matrix4 extends Matrix {
  constructor(input) {
    super(Matrix.fillna(input, 16))
  }
}
