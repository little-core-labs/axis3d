import { PerspectiveCameraProjectionContext } from './projection'
import { PerspectiveCameraInfoContext } from './info'
import { PerspectiveCameraViewContext } from './view'
import { assignDefaults, isolate } from '../../../utils'
import { Object3DContext } from '../../../object3d'
import * as defaults from '../defaults'
import { Entity } from '../../../core'

import {
  CameraInverseViewContext,
  CameraInfoContext,
  CameraEyeContext,
} from '../../context'

export function PerspectiveCameraContext(ctx, initialState = {}) {
  assignDefaults(initialState, defaults)
  return Entity(ctx, initialState,
    Object3DContext(ctx, initialState),
    CameraInfoContext(ctx, initialState),
    PerspectiveCameraInfoContext(ctx, initialState),

    isolate(PerspectiveCameraViewContext(ctx, initialState)),
    CameraInverseViewContext(ctx, initialState),
    PerspectiveCameraProjectionContext(ctx, initialState),
    CameraEyeContext(ctx, initialState),
  )
}
