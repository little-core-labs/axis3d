import { Vector } from './vector'

export class Matrix extends Vector {
  static fillna(mat, max) {
    for (let i = 0; i < max; ++i) {
      if (null == mat[i]) { mat[i] = 0 }
    }
    return mat.slice(0, max)
  }

  constructor(input) {
    super(input)
  }
}
