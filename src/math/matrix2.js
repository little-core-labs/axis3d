'use strict'

/**
 * Module dependencies.
 */

import { Matrix } from '../core/matrix'

export class Matrix2 extends Matrix {
  constructor(input) {
    super(Matrix.fillna(input, 4))
  }
}
