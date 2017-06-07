'use strict'

/**
 * Module dependencies.
 */

import { isArrayLike } from '../utils'
import { Geometry } from '../core/geometry'

import extrudeByShape from 'extrude'
import extrudeByPath from 'extrude-by-path'
import extrudeEdges from 'extrude-edges'
import cleanPSLG from 'clean-pslg'
import coalesce from 'defined'
import cdt2d from 'cdt2d'

export const kDefaultExtrudeGeometryPathZCoefficient = 0.001
export const kDefaultExtrudeGeometryPathSteps = 10

/**
 * The ExtrudeGeometry class represents 2D geometry
 */

export class ExtrudeGeometry extends Geometry {

  /**
   * ExtrudeGeometry class constructor.
   *
   * @public
   * @constructor
   * @param {!Object} opts Geometry extrusion options.
   * @param {!Array<Array<Number>>} opts.positions
   * @param {?Array<Array<Number>>} opts.edges
   * @param {?Array<Array<Number>>} opts.cells
   * @param {?Array<Array<Number>>} opts.path
   * @param {?Boolean} opts.closed
   * @throws TypeError
   */

  constructor({
    positions,
    edges,
    cells,
    path,
    closed = true,
  } = {}) {
    let complex = null

    if (false == isArrayLike(positions)) {
      throw new TypeError("Expecting positions to be an array.")
    } else if (0 == positions.length) {
      throw new TypeError("Empty positions array given.")
    }

    if (null == path) {
      complex = extrudeByShape(positions, {bottom: -1, top: 1})
    } else {
      closed = Boolean(closed)

      if (false == isArrayLike(path)) {
        throw new TypeError("Expecting path to be an array.")
      } else if (0 == path.length) {
        throw new TypeError("Empty path array given.")
      }

      // extrude edges, if not given
      if (null == edges) {
        let tmp = [...extrudeEdges.faces(positions)]
        edges = []
        for (let i = 0; i < tmp.length; i += 2) {
          edges.push([tmp[i], tmp[i + 1]])
        }
      } else if (false == isArrayLike(edges)) {
        throw new TypeError("Expecting edges to be an array.")
      } else if (0 == edges.length) {
        throw new TypeError("Empty edges array given.")
      }

      // triangluate cells if cells aren't given and edges are
      if (null == cells) {
        cells = cdt2d(positions)
      } else if (cells && false == isArrayLike(cells)) {
        throw new TypeError("Expecting cells to be an array.")
      } else if (0 == cells.length) {
        throw new TypeError("Empty cells array given.")
      }

      cleanPSLG(positions, edges)
      complex = extrudeByPath({
        positions,
        closed,
        edges,
        cells,
        path
      })
    }

    super({complex})
  }
}
