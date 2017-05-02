'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../../src/core/geometry'
import { TriangleGeometry } from '../../src/geometry/triangle'

import test from 'tape'

test('new TriangleGeometry() -> Function', ({
  deepEqual,
  assert,
  plan,
  end
}) => {
  plan(5)

  assert('function' == typeof TriangleGeometry)

  const triangle = new TriangleGeometry()

  assert('object' == typeof triangle.complex)

  const positions = [
          [-1.0, -0.5*Math.sqrt(3), +0.0],
          [+1.0, -0.5*Math.sqrt(3), +0.0],
          [+0.0, +0.5*Math.sqrt(3), +0.0],
        ]
  const normals = [
          [-1.0, -1.0, +0.0],
          [+1.0, -1.0, +0.0],
          [+0.0, +1.0, +0.0],
        ]
  const uvs = [
          [-1.0, -0.5*Math.sqrt(3)],
          [+1.0, -0.5*Math.sqrt(3)],
          [+0.0, +0.5*Math.sqrt(3)],
        ]

  deepEqual(triangle.complex.positions, positions, 'assigns default positions.')
  deepEqual(triangle.complex.normals, normals, 'assigns default normals.')
  deepEqual(triangle.complex.uvs, uvs, 'assigns default uvs.')

  end()
})