'use strict'

/**
 * Module dependencies.
 */

import { Matrix } from '../core/matrix'

export class Matrix3 extends Matrix {
  constructor(input) {
    super(Matrix.fillna(input, 9))
  }
}
