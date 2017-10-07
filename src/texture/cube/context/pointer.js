import { texture as extend } from 'regl-extend'
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

export function CubeTexturePointerContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  let faces = Array(6).fill(null)

  const cubeTexture = ctx.regl.cube(
    Object.assign(extend(initialState), {colorSpace: 'browser'})
  )

  return ScopedContext(ctx, {
    // @TODO - support subimage updates
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
      if (needsUpload) {
        const args = Object.assign({}, extend(initialState), {faces})
        cubeTexture(args)
      }
      return cubeTexture
    }
  })
}
