'use strict'

/**
 * Module dependencies.
 */

import { ExtrudeGeometry } from './extrude_geometry'
import { Object3D } from './object3d'
import { Command } from './command'
import { Mesh } from './mesh'

import vectorize from 'vectorize-text'
import coalesce from 'defined'
import unindex from 'unindex-mesh'

const kGeometryCache = {}
const kComplexCache = {}
const kMeshCache = {}

/**
 * The Text class represents an interface for triangulating text strings
 * into a simplicial complex.
 *
 * @public
 * @class Text
 * @extends Command
 */

export class Text extends Command {

  /**
   * Text class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    super(update)

    /**
     * Injected regl context.
     */

    const {context = new TextContext(ctx, initialState)} = initialState

    /**
     * Injects a text regl context.
     */

    const injectContext = ctx.regl({context})

    const object = new Object3D(ctx, {scale: [1, -1, 1]})

    /**
     * Command update function.
     */

    function update(state = {}, block) {
      const mesh = getMesh(state)
      object(() => {
        injectContext(state || {}, (...args) => {
          if ('function' == typeof mesh) {
            mesh(state, block)
          } else {
            block(...args)
          }
        })
      })

      return this
    }

    /**
     * Gets a cached mesh from input state.
     */

    function getMesh(state) {
      if ('string' == typeof state) {
        state = {text: state}
      }

      const {text} = state
      const ID = 'object' == typeof state ? JSON.stringify(state) : null

      let geometry = null
      let complex = null
      let mesh = null

      if (
        'string' == typeof text &&
        'string' == typeof ID &&
        'function' == typeof kMeshCache[ID]
      ) {
        mesh = kMeshCache[ID]
      } else if ('string' == typeof ID) {
        complex = vectorize(text, {
          textBaseline: coalesce(state.baseline, 'hanging'),
          orientation: 'ccw',
          textAlign: coalesce(state.align, 'center'),
          width: 1,
          ...state,
        })

        const path = Array(10).fill([]).map((p, i) => [0, 0, 0.001*i])

        geometry = new ExtrudeGeometry({...complex, path})
        mesh = new Mesh(ctx, {geometry})

        kComplexCache[ID] = complex
        kGeometryCache[ID] = geometry
        kMeshCache[ID] = mesh
      }

      return mesh
    }
  }
}

/**
 * TextContext class.
 *
 * @public
 * @class TextContext
 */

export class TextContext {

  /**
   * TextContext class constructor.
   *
   * @public
   * @constructor
   * @param {!Context} ctx Axis3D context object.
   * @param {?Object} initialState Optional initial state.
   */

  constructor(ctx, initialState = {}) {
    this.text = ({}, args) => {
      args = args || {}
      return coalesce(args.text, initialState.text, null)
    }
  }
}
