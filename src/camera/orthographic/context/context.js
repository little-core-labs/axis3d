import { OrthographicCameraProjectionContext } from './projection'
import { OrthographicCameraInfoContext } from './info'
import { OrthographicCameraViewContext } from './view'
import { assignDefaults, isolate } from '../../../utils'
import { Object3DContext } from '../../../object3d'
import * as defaults from '../defaults'
import { Entity } from '../../../core'

import {
  CameraInverseViewContext,
  CameraInfoContext,
  CameraEyeContext,
} from '../../context'

export function OrthographicCameraContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    Object3DContext(ctx, initialState),
    CameraInfoContext(ctx, initialState),
    OrthographicCameraInfoContext(ctx, initialState),

    isolate(OrthographicCameraViewContext(ctx, initialState)),
    CameraInverseViewContext(ctx, initialState),
    OrthographicCameraProjectionContext(ctx, initialState),
    CameraEyeContext(ctx, initialState),
  )
}
