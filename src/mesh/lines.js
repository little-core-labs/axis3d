'use strict'

/**
 * Module dependencies.
 */

import { incrementStat } from '../stats'
import { Geometry } from '../core/geometry'

import {
  MeshAttributes,
  MeshUniforms,
  Mesh,
} from '../core/mesh'

import ProjectedLines from 'screen-projected-lines'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import glslify from 'glslify'
import normals from 'normals'

/**
 * The default LinesMesh vertex shader.
 *
 * @public
 * @const
 * @type {String}
 */

export const kDefaultLinesMeshVertexShader =
  glslify(__dirname + '/../glsl/mesh/lines/vert.glsl')

/**
 * TBA
 *
 * @public
 * @class LinesMesh
 * @extends Mesh
 */

export class LinesMesh extends Mesh {

  /**
   * LinesMesh class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D render context.
   * @param {Object} initialState
   */

  constructor(ctx, initialState = {}) {
    incrementStat('LinesMesh')
    const vert = kDefaultLinesMeshVertexShader

    let {
      geometry,
      thickness: initialThickness = 0.005,
    } = initialState

    let {complex = geometry} = geometry

    const cells = complex.cells.map((cell) => cell.slice())
    const flattened = reindex(unindex(complex.positions, cells))
    complex.normals = normals.vertexNormals(flattened.cells, flattened.positions)
    Object.assign({}, complex, cells)

    const lines = ProjectedLines(complex, {
      attributes: {normals: complex.normals}
    })

    lines.normals = lines.attributes.normals
    geometry = new Geometry({complex: lines, flatten: false})
    geometry.complex.normals = lines.normals
    initialState.geometry = geometry
    super(ctx, {
      ...initialState,
      primitive: 'triangles',
      geometry,
      vert,

      uniforms: Object.assign(new MeshUniforms(ctx, initialState), {
        thickness: ({}, {thickness = initialThickness}) => thickness,
      }),

      attributes: Object.assign(new MeshAttributes(ctx, initialState), {
        nextPosition: lines.nextPositions,
        direction: lines.directions,
      })
    })
  }
}
