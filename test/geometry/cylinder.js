'use strict'

/**
 * Module dependencies.
 */

import { Geometry } from '../../src/core/geometry'
import { CylinderGeometry } from '../../src/geometry/cylinder'

import test from 'tape'

const noop = () => void 0
const createCylinderGeometryWithoutNew = (o) => CylinderGeometry(o)
const createCylinderGeometry = (o) => {
  return new CylinderGeometry(o)
}

test('new CylinderGeometry(opts) -> Function', ({
  deepEqual,
  assert,
  throws,
  equal,
  plan,
  end,
}) => {
  plan(15)

  assert('function' == typeof CylinderGeometry)

  throws(() => { createCylinderGeometryWithoutNew(noop) },
        TypeError,
        'throws TypeError when called without new.')

  const defaultCylinder = { flatten: false,
                            height: 5,
                            radiusTop: 1,
                            radiusBottom: 1,
                            radialSegments: 50,
                            heightSegments: 50 }

  const nullCylinder = createCylinderGeometry(null)
  deepEqual(defaultCylinder, nullCylinder,
            'creates default Cylinder if null is passed in as argument.')

  const noopCylinder = createCylinderGeometry(noop)
  deepEqual(defaultCylinder, noopCylinder,
            'creates default Cylinder if function is passed in as argument.')

  throws(() => { createCylinderGeometry({height: 'foo'}) },
    TypeError,
    'throws TypeError when `height` is not a number.')

  throws(() => { createCylinderGeometry({radiusTop: 'foo'}) },
    TypeError,
    'throws TypeError when `radiusTop` is not a number.')

  throws(() => { createCylinderGeometry({radiusBottom: 'foo'}) },
    TypeError,
    'throws TypeError when `radiusBottom` is not a number.')

  throws(() => { createCylinderGeometry({radialSegments: 'foo'}) },
    TypeError,
    'throws TypeError when `radialSegments` is not a number.')

  throws(() => { createCylinderGeometry({heightSegments: 'foo'}) },
    TypeError,
    'throws TypeError when `heightSegments` is not a number.')

  const anotherCylinder = createCylinderGeometry({ height: 1,
                                                   radiusTop: 2,
                                                   radiusBottom: 3,
                                                   radialSegments: 4,
                                                   heightSegments: 5 })

  assert('object' == typeof anotherCylinder.complex)

  equal(1, anotherCylinder.height, 'assigns height.')
  equal(2, anotherCylinder.radiusTop, 'assigns radiusTop.')
  equal(3, anotherCylinder.radiusBottom, 'assigns radiusBottom.')
  equal(4, anotherCylinder.radialSegments, 'assigns radialSegments.')
  equal(5, anotherCylinder.heightSegments, 'assigns heightSegments.')

  end()
})