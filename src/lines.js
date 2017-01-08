'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from './stats'
import { MeshCommand } from './mesh'
import ProjectedLines from 'screen-projected-lines'
import { Geometry } from './geometry'
import glslify from 'glslify'
import normals from 'angle-normals'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'

const kDefaultVertexShader = glslify(__dirname + '/glsl/lines/vert.glsl')

module.exports = exports = (...args) => new LinesCommand(...args)
export class LinesCommand extends MeshCommand {
  constructor(ctx, initialState = {}) {
    incrementStat('Lines')
    const vert = kDefaultVertexShader

    let {
      geometry,
      thickness: initialThickness = 0.005,
    } = initialState

    let {complex = geometry} = geometry

    const cells = complex.cells.map((cell) => cell.slice())
    const flattened = reindex(unindex(complex.positions, cells))
    complex.normals = normals(flattened.cells, flattened.positions)
    Object.assign({}, complex, cells)

    const lines = ProjectedLines(complex, {
      attributes: {
        normals: complex.normals || normals(complex.cells, complex.positions)
      }
    })

    lines.normals = lines.attributes.normals
    geometry = new Geometry({complex: lines, flatten: false})
    geometry.complex.normals = lines.normals
    super(ctx, {
      ...initialState,
      primitive: 'triangles',
      geometry,
      vert,

      uniforms: {
        thickness: ({}, {thickness = initialThickness}) => thickness,
      },

      attributes: {
        nextPosition: lines.nextPositions,
        direction: lines.directions,
      },
    })
  }
}
