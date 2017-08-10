import { assignDefaults } from '../../../utils'
import { ScopedContext } from '../../../scope'
import { Component } from '../../../core'
import * as defaults from '../defaults'

import {
  getCubeTextureDataResolution,
  isCubeTextureDataReady,
  isImage,
  isVideo,
} from '../../utils'

export class CubeTexturePointerContext extends Component {
  static defaults() { return { ...defaults } }
  constructor(ctx, initialState = {}) {
    assignDefaults(initialState, CubeTexturePointerContext.defaults())
    const cubeTexture = ctx.regl.cube({ ...initialState.texture })
    let faces = Array(6).fill(null)
    super(ctx, initialState,
      new ScopedContext(ctx, {
        cubeTexturePointer({cubeTextureData}) {
          let needsUpload = false
          if (Array.isArray(cubeTextureData)) {
            for (let i = 0 ; i < faces.length; ++i) {
              if (faces[i] != cubeTextureData[i]) {
                if (isCubeTextureDataReady(cubeTextureData[[i]])) {
                  faces[i] = cubeTextureData[i]
                  needsUpload = true
                }
              }
            }
          }
          const resolution = getCubeTextureDataResolution(faces)
          for (let i = 0; i < faces.length; ++i) {
            if (null == faces[i] || !isCubeTextureDataReady(faces[i])) {
              faces[i] = {shape: resolution}
            }
          }
          if (needsUpload) { cubeTexture(...faces) }
          return cubeTexture
        }
      })
    )
  }
}
