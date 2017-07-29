'use strict'

import { ExtrudeGeometry } from '../geometry/extrude_geometry'
import { Object3D } from './object3d'
import { Command } from './command'
import { Mesh } from './mesh'

import vectorize from 'vectorize-text'
import coalesce from 'defined'
import unindex from 'unindex-mesh'

const kGeometryCache = {}
const kComplexCache = {}
const kMeshCache = {}

export class Text extends Command {

  constructor(ctx, initialState = {}) {
    super(update)

    const {context = new TextContext(ctx, initialState)} = initialState
    const injectContext = ctx.regl({context})
    const object = new Object3D(ctx, {scale: [1, -1, 1]})

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

export class TextContext {
  constructor(ctx, initialState = {}) {
    this.text = ({}, args) => {
      args = args || {}
      return coalesce(args.text, initialState.text, null)
    }
  }
}
