import { ShaderInstancedAttributes } from '../shader'
import { CameraShaderUniforms } from '../camera'
import { FrameShaderUniforms } from '../frame'
import { assignDefaults } from '../utils'
import * as defaults from './defaults'
import { Component } from '../core'
import { Object3D } from '../object3d'
import { Geometry } from '../core'

import { MeshContext } from './context'
import { MeshState } from './state'
import {
  MeshShaderAttributes,
  MeshShaderUniforms,
  MeshShaderDefines,
  MeshShader
} from './shader'


export class Mesh extends Component {
  static defaults() {
    return { ...defaults }
  }

  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, Mesh.defaults())
    if (ctx.isExtensionEnabled('angle_instanced_arrays')) {
      if (false !== initialState.instancing) {
        initialState.instancing = true
      } else {
        initialState.instancing = false
       }
    }
    if (null == initialState.geometry.complex) {
      initialState.geometry = new Geometry({complex: initialState.geometry})
    }

    const getContext = ctx.regl({})

    const draw = ctx.regl({
      instances: () => {
        return batchLength
      },
      ...initialState.regl,
    })

    const instanceModelBuffer1 = ctx.regl.buffer({ })
    const instanceModelBuffer2 = ctx.regl.buffer({ })
    const instanceModelBuffer3 = ctx.regl.buffer({ })
    const instanceModelBuffer4 = ctx.regl.buffer({ })

    const instancedAttributes = {
      model: null
    }

    let batchLength = 1
    let batchId = 0
    super(ctx, initialState,
      (state, next) => {
        // capture batch length
        getContext(({batchLength: bl, batchId: bid}) => {
          batchLength = bl
          batchId = bid
        })
        if (initialState.instancing) {
          if (0 == batchId) {
            instancedAttributes.model = []
            instanceModelBuffer1({length: 4*4*batchLength, type: 'float', usage: 'dynamic'})
            instanceModelBuffer2({length: 4*4*batchLength, type: 'float', usage: 'dynamic'})
            instanceModelBuffer3({length: 4*4*batchLength, type: 'float', usage: 'dynamic'})
            instanceModelBuffer4({length: 4*4*batchLength, type: 'float', usage: 'dynamic'})
          }
        }
        next()
      },

      new Object3D(ctx, initialState),
      new MeshContext(ctx, initialState),
      new MeshState(ctx, initialState),
      new MeshShaderDefines(ctx, initialState),
      new MeshShaderAttributes(ctx, initialState),
      new MeshShaderUniforms(ctx, initialState),
      new MeshShader(ctx, initialState),
      new CameraShaderUniforms(ctx, { ...initialState.camera }),
      new FrameShaderUniforms(ctx, { ...initialState.frame }),

      !initialState.instancing
        ? new Component(ctx)
        : Component.compose((state, next) => {
            getContext(({transform}) => {
              if (instancedAttributes.model) {
                instancedAttributes.model[batchId] = transform.slice()
                instanceModelBuffer1.subdata(transform.slice(0, 4), 4*4*batchId)
                instanceModelBuffer2.subdata(transform.slice(4, 8), 4*4*batchId)
                instanceModelBuffer3.subdata(transform.slice(8, 12), 4*4*batchId)
                instanceModelBuffer4.subdata(transform.slice(12, 16), 4*4*batchId)
              }
              next()
            })
          },

          new ShaderInstancedAttributes(ctx, {
            instanceModel1: () => instanceModelBuffer1,
            instanceModel2: () => instanceModelBuffer2,
            instanceModel3: () => instanceModelBuffer3,
            instanceModel4: () => instanceModelBuffer4,
          })
        ),

      (state, block) => {
        getContext(({transform}) => {
          if (initialState.instancing) {
            if (batchLength - 1 == batchId) {
              draw(state)
              batchLength = 1
              batchId = 0
            }
          } else {
            draw(state)
            batchLength = 1
            batchId = 0
          }
          getContext(block)
        })
      }
    )
  }
}
